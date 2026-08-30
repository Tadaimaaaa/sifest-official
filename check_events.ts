import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

let supabaseUrl = '';
let supabaseKey = '';

envContent.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
});

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkEventsTable() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .limit(1);

  if (error) {
    console.error("Error querying events table:", error.message);
  } else {
    console.log("Table 'events' exists! Sample data/structure:");
    console.log(data);
  }
}

checkEventsTable();
