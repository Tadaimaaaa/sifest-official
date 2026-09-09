const { createClient } = require('@supabase/supabase-js');

// Using exact same env as sifest-web
const supabaseUrl = 'https://ihpgoxdgdhxnnpppasab.supabase.co';
const supabaseServiceKey = 'sb_secret_3k_-GAC9Ru8E839HAWp9Zw_8YPfH8IR';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  // Get first registration
  const { data: rows } = await supabase
    .from('registrations')
    .select('id, registration_code, status')
    .limit(1);

  const row = rows?.[0];
  console.log("Before:", row);

  const { error } = await supabase
    .from('registrations')
    .update({ status: 'VERIFIED' })
    .eq('id', row.id);

  if (error) {
    console.error("❌ Update failed:", error.message);
  } else {
    console.log("✅ Update to VERIFIED succeeded via sifest-web credentials!");
    // revert
    await supabase.from('registrations').update({ status: 'PENDING' }).eq('id', row.id);
    console.log("✅ Reverted to PENDING.");
  }
}

main();
