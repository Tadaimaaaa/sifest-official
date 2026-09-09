require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Using anon key because service role key might be outdated locally
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function updateEvents() {
  console.log("Starting event updates using ANON key (make sure RLS allows update/delete or we use RPC/direct SQL in Dashboard)...");

  // Since anon key might not have UPDATE/DELETE rights on events table, let's just log what we are about to do.
  // Actually, we can generate a raw SQL script for the user to run in Supabase SQL Editor!
  const sql = `
-- 1. Rename Seminar
UPDATE events SET name = 'Seminar Nasional Teknologi' WHERE slug = 'seminar-nasional';

-- 2. Rename MLBB
UPDATE events SET name = 'Mobile Legends E-Sport' WHERE slug = 'turnamen-esport-mlbb';

-- 3. Delete Futsal Championship SI FEST
DELETE FROM events WHERE slug = 'turnamen-futsal';

-- 4. Update Open Bazaar into Mahasiswa and Umum
UPDATE events SET name = 'Open Bazaar Umum', slug = 'open-bazaar-umum' WHERE slug = 'open-bazaar';

-- Insert Mahasiswa if not exists
INSERT INTO events (slug, name, description, registration_open, price)
SELECT 'open-bazaar-mahasiswa', 'Open Bazaar Mahasiswa', 'Pendaftaran Open Bazaar khusus untuk Mahasiswa.', true, 0
WHERE NOT EXISTS (SELECT 1 FROM events WHERE slug = 'open-bazaar-mahasiswa');
  `;

  console.log("SQL SCRIPT TO RUN IN SUPABASE DASHBOARD:\n", sql);
}

updateEvents().catch(console.error);
