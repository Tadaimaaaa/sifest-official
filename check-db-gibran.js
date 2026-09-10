const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ihpgoxdgdhxnnpppasab.supabase.co';
const supabaseKey = 'sb_publishable_oqTxtR39oWOy8sgYSAgWdA_b4NPQ0Rb';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('registrations').select('id, registration_code, event_id, status');
  console.log('Registrations:', data);
}

check();
