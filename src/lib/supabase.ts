import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Data Fetching Utilities ---

export async function fetchCurrentLevel() {
  const { data, error } = await supabase
    .from('levels')
    .select('*')
    .eq('status', 'active')
    .order('level_number', { ascending: true })
    .limit(1)
    .maybeSingle();
    
  if (error) {
    console.error('Error fetching current level:', error);
    return null;
  }
  return data;
}

export async function fetchActivityFeed() {
  const { data, error } = await supabase
    .from('activity_feed')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
    
  if (error) {
    console.error('Error fetching activity feed:', error);
    return [];
  }
  return data;
}

export async function fetchTotalStats() {
  const { data: donations, error } = await supabase
    .from('donations')
    .select('amount');
    
  if (error) {
    console.error('Error fetching stats:', error);
    return { totalCollected: 0, totalSupporters: 0 };
  }
  
  const totalCollected = donations.reduce((sum, d) => sum + Number(d.amount), 0);
  const totalSupporters = donations.length; // Simplified for MVP
  
  return { totalCollected, totalSupporters };
}

export async function insertDonation(amount: number, levelId: string, message: string) {
  // 1. Insert Donation
  const { error: donationError } = await supabase
    .from('donations')
    .insert([{ 
      amount, 
      level_id: levelId, 
      upi_transaction_id: `txn_${Date.now()}`, // Mock txn ID for now
      message 
    }]);

  if (donationError) {
    console.error('Error inserting donation:', donationError);
    return false;
  }

  // 2. Insert Activity Feed
  await supabase
    .from('activity_feed')
    .insert([{
      message: `A supporter donated ₹${amount.toLocaleString('en-IN')}`,
      amount,
      event_type: 'donation'
    }]);

  // 3. Update Level Collected Amount
  // Note: In production, this should ideally be handled by a Supabase Database Trigger
  // But for MVP, we'll increment it from the client (less secure but works for demo).
  const { data: level } = await supabase.from('levels').select('collected_amount').eq('id', levelId).single();
  if (level) {
    await supabase
      .from('levels')
      .update({ collected_amount: Number(level.collected_amount) + amount })
      .eq('id', levelId);
  }

  return true;
}
