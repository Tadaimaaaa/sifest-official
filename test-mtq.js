const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testMTQ() {
  const { data, error } = await supabase.rpc("create_registration_flow", {
    p_event_slug: "lomba-keagamaan",
    p_registration_code: "SIF-2026-MTQ-TEST",
    p_full_name: "Dimas",
    p_email: "aku@gmail.com",
    p_whatsapp: "081297322",
    p_institution: "SMA 1 Tebo",
    p_metadata: null,
  });
  
  console.log("Data:", data);
  console.log("Error:", error);
}

testMTQ();
