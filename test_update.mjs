import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xhvwfujyhxumqroexpum.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhodndmdWp5aHh1bXFyb2V4cHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMzQ3OTcsImV4cCI6MjA5MzYxMDc5N30.F3fCCtMlRYa1RAltE52iaKNpAxwl4Z3ie0jamR485WY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase
    .from('donations')
    .update({ selfie_url: 'https://example.com/selfie.jpg' })
    .eq('upi_transaction_id', 'some-id')
    .select();

  console.log('Update result:', data);
  console.log('Update error:', error);
}

test();
