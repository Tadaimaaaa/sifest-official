import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('events').insert({
    slug: 'turnamen-futsal-mahasiswa',
    name: 'Turnamen Futsal Mahasiswa',
    registration_open: true,
  }).select();
  
  if (error) {
    console.error(error);
  } else {
    console.log("Inserted:", data);
  }
}
main();
