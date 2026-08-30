import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { RegistrationDraft } from "@/lib/types/registration";
import crypto from "crypto";

export type RegistrationResult = {
  success: boolean;
  registrationId?: string;
  registrationCode?: string;
  error?: string;
};

/**
 * Generates a unique, readable registration code.
 * Example: SIF-2026-A1B2C3
 */
function generateRegistrationCode(): string {
  const randomChars = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `SIF-2026-${randomChars}`;
}

/**
 * Submits a registration using the admin client and Supabase RPC to ensure atomicity.
 */
export async function submitRegistration(draft: RegistrationDraft): Promise<RegistrationResult> {
  try {
    const registrationCode = generateRegistrationCode();

    // Call the RPC function defined in the migration
    const { data, error } = await supabaseAdmin.rpc("create_registration_flow", {
      p_event_slug: draft.eventSlug,
      p_registration_code: registrationCode,
      p_full_name: draft.participant.fullName,
      p_email: draft.participant.email,
      p_whatsapp: draft.participant.whatsapp,
      p_institution: draft.participant.institution,
    });

    if (error) {
      console.error("[Data Layer] Registration RPC Error:", error);
      return { success: false, error: "Pendaftaran gagal diproses oleh database." };
    }

    // The RPC returns a JSON object on success
    const result = data as { success: boolean; registration_id: string; registration_code: string };

    return {
      success: true,
      registrationId: result.registration_id,
      registrationCode: result.registration_code,
    };
  } catch (err) {
    console.error("[Data Layer] Registration Exception:", err);
    return { success: false, error: "Terjadi kesalahan internal pada server." };
  }
}
