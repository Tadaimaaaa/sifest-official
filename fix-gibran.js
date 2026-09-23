const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ihpgoxdgdhxnnpppasab.supabase.co';
const supabaseKey = 'sb_secret_3k_-GAC9Ru8E839HAWp9Zw_8YPfH8IR';
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function fix() {
  console.log('Inserting tx for Gibran...');
  const { data, error } = await supabaseAdmin
    .from('transactions')
    .insert({
      registration_id: '680d5f2c-9cd9-4725-8667-45a16cede4a4', // Gibran's ID
      amount: 0,
      status: "PAID",
      payment_method: "FREE",
      provider: "SYSTEM",
      paid_at: new Date().toISOString()
    });
    
  if (error) console.log('Error inserting:', error);
  else console.log('Successfully inserted transaction');
  
  await supabaseAdmin.from('registrations').update({ status: 'CONFIRMED' }).eq('id', '680d5f2c-9cd9-4725-8667-45a16cede4a4');
  console.log('Updated status to CONFIRMED');
}

fix();
