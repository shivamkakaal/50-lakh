import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { StandardCheckoutClient, Env } from '@phonepe-pg/pg-sdk-node';

const CLIENT_ID = process.env.PHONEPE_CLIENT_ID || process.env.PHONEPE_MERCHANT_ID!;
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET || process.env.PHONEPE_SALT_KEY!;
const CLIENT_VERSION = parseInt(process.env.PHONEPE_CLIENT_VERSION || '1');
const ENVIRONMENT = (process.env.PHONEPE_ENV || 'PRODUCTION').toUpperCase();
const PHONEPE_ENV = ENVIRONMENT === 'PRODUCTION' ? Env.PRODUCTION : Env.SANDBOX;

export async function GET(req: Request) {
  return handleCallback(req);
}

export async function POST(req: Request) {
  return handleCallback(req);
}

async function handleCallback(req: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;

  try {
    const url = new URL(req.url);
    let merchantOrderId = url.searchParams.get('id');

    // PhonePe might send POST data when redirecting via form POST
    if (!merchantOrderId && req.method === 'POST') {
        try {
            const formData = await req.formData();
            merchantOrderId = formData.get('transactionId') as string || formData.get('merchantOrderId') as string;
        } catch(e) {}
    }

    if (!merchantOrderId) {
      return NextResponse.redirect(`${baseUrl}/donation/?payment=failed`, { status: 303 });
    }

    // 1. Initialize PhonePe SDK Client
    const client = StandardCheckoutClient.getInstance(CLIENT_ID, CLIENT_SECRET, CLIENT_VERSION, PHONEPE_ENV);

    // 2. Fetch Order Status from PhonePe
    const statusResponse = await client.getOrderStatus(merchantOrderId);
    const state = statusResponse.state; // COMPLETED, FAILED, PENDING

    if (state === 'COMPLETED') {
      // Fetch amount to pass back to frontend for the ThankYouModal
      const { data: donation } = await supabase
        .from('donations')
        .select('amount')
        .eq('upi_transaction_id', merchantOrderId)
        .single();
        
      const amount = donation?.amount || 0;

      await supabase
        .from('donations')
        .update({ state: 'success' })
        .eq('upi_transaction_id', merchantOrderId);

      return NextResponse.redirect(`${baseUrl}/donation/?payment=success&amount=${amount}&txnId=${merchantOrderId}`, { status: 303 });
    } else {
      await supabase
        .from('donations')
        .update({ state: 'failed' })
        .eq('upi_transaction_id', merchantOrderId);

      return NextResponse.redirect(`${baseUrl}/donation/?payment=failed`, { status: 303 });
    }

  } catch (error) {
    console.error('Payment Callback Error:', error);
    return NextResponse.redirect(`${baseUrl}/donation/?payment=error`, { status: 303 });
  }
}
