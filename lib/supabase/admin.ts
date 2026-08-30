import "server-only";
import { createClient } from "@supabase/supabase-js";

// Ensure this file is only executed on the server to prevent leaking the service role key
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
}

/**
 * Admin client with Service Role privileges.
 * WARNING: Bypasses Row Level Security (RLS).
 * Never use this client in public routes or send it to the frontend.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
