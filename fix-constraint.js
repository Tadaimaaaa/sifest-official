const { createClient } = require('@supabase/supabase-js');

// Use sifest-official env (NEXT_PUBLIC_SUPABASE_URL)
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log("Connecting to:", supabaseUrl);

  // Test current constraint by trying to update to VERIFIED
  const { data: before, error: beforeErr } = await supabase
    .from('registrations')
    .select('id, registration_code, status')
    .limit(1);
  
  console.log("Sample row:", before);
  
  // Try to update to VERIFIED
  const testId = before?.[0]?.id;
  const { error: updateErr } = await supabase
    .from('registrations')
    .update({ status: 'VERIFIED' })
    .eq('id', testId);

  if (updateErr) {
    console.error("❌ Cannot update to VERIFIED:", updateErr.message);
    console.log("\n>>> The CHECK constraint is blocking updates.");
    console.log(">>> Please run this SQL in Supabase Dashboard > SQL Editor:");
    console.log(`
ALTER TABLE registrations DROP CONSTRAINT IF EXISTS registrations_status_check;
ALTER TABLE registrations ADD CONSTRAINT registrations_status_check 
  CHECK (status IN ('PENDING','WAITING_PAYMENT','PAID','VERIFIED','REJECTED','CANCELLED','INCOMPLETE','EXPIRED','FAILED','CONFIRMED'));
    `);
  } else {
    console.log("✅ Update to VERIFIED succeeded! No constraint issue.");
    // Revert
    await supabase.from('registrations').update({ status: 'PENDING' }).eq('id', testId);
    console.log("✅ Reverted back to PENDING.");
  }
}

main();
