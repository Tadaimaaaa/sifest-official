const { createClient } = require('@supabase/supabase-js');

// Using sifest-official .env.local which has NEXT_PUBLIC_SUPABASE_URL
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixConstraint() {
  console.log("Fixing transactions status constraint...");
  
  // Step 1: Drop old constraint
  const { error: e1 } = await supabase.from('_dummy_nonexistent_').select('*').limit(0);
  
  // Use raw postgres via supabase-js is not possible directly
  // Instead, try direct update to see current constraint
  const { error: testErr } = await supabase
    .from('transactions')
    .update({ status: 'WAITING_PAYMENT' })
    .eq('id', '00000000-0000-0000-0000-000000000000'); // won't match, just test constraint

  if (testErr && testErr.message.includes('check constraint')) {
    console.log("❌ Constraint still blocking WAITING_PAYMENT.");
    console.log("Please run this SQL in Supabase Dashboard:");
    console.log(`
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS transactions_status_check;
ALTER TABLE transactions ADD CONSTRAINT transactions_status_check 
  CHECK (status IN ('PENDING','WAITING_PAYMENT','PAID','FAILED','EXPIRED','CANCELLED'));
`);
  } else {
    console.log("✅ transactions constraint is OK, WAITING_PAYMENT allowed.");
  }
}

fixConstraint();
