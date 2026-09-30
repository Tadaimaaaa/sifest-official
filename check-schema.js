const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ihpgoxdgdhxnnpppasab.supabase.co';
const supabaseKey = 'sb_publishable_oqTxtR39oWOy8sgYSAgWdA_b4NPQ0Rb';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  const { data, error } = await supabase.from('events').select('*').limit(1);
  if (error) {
    console.error(error.message);
  } else {
    console.log(Object.keys(data[0]));
  }
}
checkSchema();
