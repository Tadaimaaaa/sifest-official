require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
async function run() {
  const { data, error } = await supabase.from('events').update({ slug: 'turnamen-futsal-mahasiswa', name: 'Turnamen Futsal Mahasiswa' }).eq('slug', 'turnamen-futsal-umum').select();
  console.log(data, error);
}
run();
