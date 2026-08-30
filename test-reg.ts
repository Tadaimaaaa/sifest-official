import { createClient } from '@supabase/supabase-js';
import fs from "fs";
const envFile = fs.readFileSync(".env.local", "utf-8");
envFile.split("\n").forEach(line => {
  if (line && line.includes("=")) {
    const [key, val] = line.split("=");
    process.env[key.trim()] = val.trim();
  }
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("Testing Registration RPC...");
  const { data, error } = await supabase.rpc("create_registration_flow", {
    p_event_slug: "lomba-keagamaan",
    p_registration_code: "SIF-2026-TEST",
    p_full_name: "Test User",
    p_email: "test@example.com",
    p_whatsapp: "08123456789",
    p_institution: "Test Inst"
  });

  console.log("Result:", data);
  console.log("Error:", error);
}
test();
