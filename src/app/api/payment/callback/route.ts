import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID!;
const SALT_KEY = process.env.PHONEPE_SALT_KEY!;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';
const ENV = process.env.PHONEPE_ENV || 'PRODUCTION';

const PHONEPE_HOST_URL = ENV === 'PRODUCTION' 
  ? 'https://api.phonepe.com/apis/hermes' 
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

// PhonePe redirects back via POST
export async function POST(req: Request) {
  try {
    // PhonePe sends data via form URL encoded in POST redirect
    const formData = await req.formData();
    const code = formData.get('code');
    const merchantId = formData.get('merchantId');
    const transactionId = formData.get('transactionId');
    const providerReferenceId = formData.get('providerReferenceId'); // Real UPI Ref No

    if (!transactionId || !merchantId) {
      return NextResponse.redirect(new URL('/?payment=failed', req.url), { status: 303 });
    }

    // Always do a Server-to-Server status check to prevent spoofing
    const endpoint = `/pg/v1/status/${merchantId}/${transactionId}`;
    const stringToHash = endpoint + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const checksum = `${sha256}###${SALT_INDEX}`;

    const statusResponse = await fetch(`${PHONEPE_HOST_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': merchantId as string,
      }
    });

    const statusData = await statusResponse.json();

    if (statusData.success && statusData.code === 'PAYMENT_SUCCESS') {
      // 1. Fetch the pending donation
      const { data: donation } = await supabase
        .from('donations')
        .select('*')
        .eq('upi_transaction_id', transactionId)
        .single();

      if (donation && donation.state === 'pending') {
        // 2. Mark as success and save the real bank reference ID
        await supabase
          .from('donations')
          .update({ 
            state: 'success',
            upi_transaction_id: providerReferenceId || transactionId 
          })
          .eq('id', donation.id);

        // 3. Add to activity feed (Public display)
        await supabase
          .from('activity_feed')
          .insert([{
            message: `${donation.name || 'Anonymous'} donated ₹${donation.amount.toLocaleString('en-IN')}`,
            amount: donation.amount,
            event_type: 'donation'
          }]);

        // 4. Update Level Collected Amount and Auto-Progress
        const { data: level } = await supabase.from('levels').select('*').eq('id', donation.level_id).single();
        
        if (level) {
          const newCollected = Number(level.collected_amount) + Number(donation.amount);
          
          if (newCollected >= Number(level.target_amount)) {
            // Level is Complete!
            await supabase
              .from('levels')
              .update({ collected_amount: newCollected, status: 'complete' })
              .eq('id', level.id);

            // Add Level Complete to Activity Feed
            await supabase
              .from('activity_feed')
              .insert([{
                message: `Level ${level.level_number}: ${level.name} is complete! 🎉`,
                event_type: 'level_complete'
              }]);

            // Find and Activate Next Level
            const { data: nextLevel } = await supabase
              .from('levels')
              .select('*')
              .eq('level_number', level.level_number + 1)
              .single();

            if (nextLevel) {
              await supabase
                .from('levels')
                .update({ status: 'active' })
                .eq('id', nextLevel.id);
            }

          } else {
            // Normal update, not complete yet
            await supabase
              .from('levels')
              .update({ collected_amount: newCollected })
              .eq('id', level.id);
          }
        }
      }

      // Redirect to home with success param to trigger Thank You modal
      return NextResponse.redirect(new URL(`/?payment=success&amount=${donation?.amount || 0}&txnId=${transactionId}`, req.url), { status: 303 });
    } else {
      // Payment Failed or Pending
      await supabase
        .from('donations')
        .update({ state: 'failed' })
        .eq('upi_transaction_id', transactionId);

      return NextResponse.redirect(new URL('/?payment=failed', req.url), { status: 303 });
    }

  } catch (error) {
    console.error('Payment Callback Error:', error);
    return NextResponse.redirect(new URL('/?payment=error', req.url), { status: 303 });
  }
}
