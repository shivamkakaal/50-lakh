import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID!;
const SALT_KEY = process.env.PHONEPE_SALT_KEY!;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';
const ENV = process.env.PHONEPE_ENV || 'PRODUCTION';

// Use production URL based on your screenshot
const PHONEPE_HOST_URL = ENV === 'PRODUCTION' 
  ? 'https://api.phonepe.com/apis/hermes' 
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

export async function POST(req: Request) {
  try {
    const { amount, levelId, message, donorName } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const merchantTransactionId = `MT_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const merchantUserId = `MUID_${Date.now()}`;
    const amountInPaise = amount * 100;

    // Get the base URL for the callback
    // If you host this on premiumstorekathua.shop/donate, this needs to reflect that.
    // For local testing, we use the host header or NEXT_PUBLIC_SITE_URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const redirectUrl = `${baseUrl}/donation/api/payment/callback?id=${merchantTransactionId}`;

    // 1. First, save a pending donation record in Supabase
    // We will update this to "success" in the callback
    const { error: dbError } = await supabase.from('donations').insert([{
      amount,
      name: donorName || 'Anonymous',
      level_id: levelId,
      upi_transaction_id: merchantTransactionId,
      message,
      state: 'pending',
      is_public: true
    }]);

    if (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json({ error: 'Failed to create donation record' }, { status: 500 });
    }

    // 2. Prepare PhonePe Payload
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: merchantUserId,
      amount: amountInPaise,
      redirectUrl: redirectUrl,
      redirectMode: 'POST',
      callbackUrl: redirectUrl, // S2S webhook (using same for simplicity, usually server endpoint)
      mobileNumber: "9999999999", // Optional but sometimes required by PG
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    const payloadString = JSON.stringify(payload);
    const base64Payload = Buffer.from(payloadString).toString('base64');

    // 3. Generate Checksum: SHA256(Base64Payload + "/pg/v1/pay" + saltKey) + "###" + saltIndex
    const stringToHash = base64Payload + '/pg/v1/pay' + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const checksum = `${sha256}###${SALT_INDEX}`;

    // 4. Call PhonePe API
    const response = await fetch(`${PHONEPE_HOST_URL}/pg/v1/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'accept': 'application/json',
      },
      body: JSON.stringify({ request: base64Payload })
    });

    const responseData = await response.json();

    if (responseData.success && responseData.data?.instrumentResponse?.redirectInfo?.url) {
      // Return the PhonePe payment page URL to the frontend
      return NextResponse.json({ redirectUrl: responseData.data.instrumentResponse.redirectInfo.url });
    } else {
      console.error('PhonePe API Error:', responseData);
      return NextResponse.json({ error: 'Failed to initiate payment with PhonePe' }, { status: 500 });
    }

  } catch (error) {
    console.error('Payment Initiation Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
