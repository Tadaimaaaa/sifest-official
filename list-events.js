require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function listEvents() {
  const { data, error } = await supabase.from('events').select('id, slug, name, registration_open');
  console.log("Events:", JSON.stringify(data, null, 2));
  if (error) console.log("Error:", error);
}

listEvents();
