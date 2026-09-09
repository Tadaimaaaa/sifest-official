const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function insertEvent() {
  const { data, error } = await supabaseAdmin.from('events').insert({
    slug: 'turnamen-esport-efootball',
    name: 'Turnamen E-Sport E-Football',
    category: 'E-Sport',
    description: 'Turnamen E-Football SI FEST 2026 mencari pemain esports terbaik.',
    location: 'Lantai 2 UPI Exhibition Hall',
    price: 'Single Slot: Rp 75.000, Double Slot: Rp 125.000',
    registration_open: true
  });

  if (error) {
    console.error("Error inserting:", error);
  } else {
    console.log("Successfully inserted E-Football event!");
  }
}

insertEvent();
