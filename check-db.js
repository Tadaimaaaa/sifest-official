require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  const { data, error } = await supabase.from('registrations').select('*').limit(10);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Registrations count:', data.length);
    console.log('Sample:', data.slice(0, 2));
  }
}

checkData();
