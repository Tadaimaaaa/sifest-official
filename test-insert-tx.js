const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ihpgoxdgdhxnnpppasab.supabase.co';
const supabaseKey = 'sb_publishable_oqTxtR39oWOy8sgYSAgWdA_b4NPQ0Rb';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log('Inserting tx...');
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      registration_id: '680d5f2c-9cd9-4725-8667-45a16cede4a4', // Gibran's ID
      amount: 0,
      status: "PAID",
      payment_method: "FREE",
      provider: "SYSTEM",
      paid_at: new Date().toISOString()
    });
    
  console.log('Error:', error);
  console.log('Data:', data);
}

check();
