import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  const { data } = await supabase.from('participants').select('full_name, whatsapp, metadata, registrations(events(slug))');
  
  console.log("Total participants:", data?.length);
  console.log("First participant:", JSON.stringify(data?.[0], null, 2));
}

run();
