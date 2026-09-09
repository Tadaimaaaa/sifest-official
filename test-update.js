const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../sifest-web/.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function testUpdate() {
  const { data, error } = await supabaseAdmin
    .from('registrations')
    .update({ status: 'VERIFIED' })
    .eq('registration_code', 'SIF-2026-3F8805');

  console.log("Update Data:", data);
  console.log("Update Error:", error);
}

testUpdate();
