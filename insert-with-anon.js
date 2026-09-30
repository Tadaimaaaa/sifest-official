require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
async function run() {
  const { data, error } = await supabase.from('events').insert({
    slug: 'turnamen-futsal-mahasiswa',
    name: 'Turnamen Futsal Mahasiswa',
    registration_open: true
  }).select();
  console.log("Insert result:", data, error);
}
run();
