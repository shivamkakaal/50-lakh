import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { StandardCheckoutClient, Env, StandardCheckoutPayRequest } from '@phonepe-pg/pg-sdk-node';
import crypto from 'crypto';

const CLIENT_ID = process.env.PHONEPE_CLIENT_ID || process.env.PHONEPE_MERCHANT_ID!;
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET || process.env.PHONEPE_SALT_KEY!;
const CLIENT_VERSION = parseInt(process.env.PHONEPE_CLIENT_VERSION || '1');
const ENVIRONMENT = (process.env.PHONEPE_ENV || 'PRODUCTION').toUpperCase();
const PHONEPE_ENV = ENVIRONMENT === 'PRODUCTION' ? Env.PRODUCTION : Env.SANDBOX;

export async function POST(req: Request) {
  try {
    const { amount, levelId, message, donorName, profession } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const merchantOrderId = `MT_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const amountInPaise = amount * 100;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const redirectUrl = `${baseUrl}/donation/api/payment/callback?id=${merchantOrderId}`;

    // 1. Insert pending donation record in Supabase
    const { error: dbError } = await supabase.from('donations').insert([{
      amount,
      name: donorName || 'Anonymous',
      profession: profession || null,
      level_id: levelId,
      upi_transaction_id: merchantOrderId,
      message,
      state: 'pending',
      is_public: true
    }]);

    if (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json({ error: `Database Error: ${dbError.message}` }, { status: 500 });
    }

    // 2. Initialize PhonePe SDK Client
    const client = StandardCheckoutClient.getInstance(CLIENT_ID, CLIENT_SECRET, CLIENT_VERSION, PHONEPE_ENV);

    // 3. Create Checkout Request
    const request = StandardCheckoutPayRequest.builder()
        .merchantOrderId(merchantOrderId)
        .amount(amountInPaise)
        .redirectUrl(redirectUrl)
        .build();
  
    // 4. Initiate Payment
    const response = await client.pay(request);
    
    if (response.redirectUrl) {
        return NextResponse.json({ redirectUrl: response.redirectUrl });
    } else {
        return NextResponse.json({ error: `PhonePe SDK Error: No redirect URL returned.` }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Payment Initiation Error:', error);
    const errMsg = error.message || JSON.stringify(error);
    return NextResponse.json({ error: `Server Error: ${errMsg}` }, { status: 500 });
  }
}
