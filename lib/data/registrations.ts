"use server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { RegistrationDraft } from "@/lib/types/registration";
import crypto from "crypto";

export type RegistrationResult = {
  success: boolean;
  registrationId?: string;
  registrationCode?: string;
  error?: string;
};

function generateRegistrationCode(): string {
  const randomChars = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `SIF-2026-${randomChars}`;
}

export async function submitRegistration(draft: RegistrationDraft): Promise<RegistrationResult> {
  try {
    const registrationCode = generateRegistrationCode();

    // Step 1: Find the event by slug
    const { data: event, error: eventError } = await supabaseAdmin
      .from("events")
      .select("id, registration_open")
      .eq("slug", draft.eventSlug)
      .single();

    if (eventError || !event) {
      return { success: false, error: `Event tidak ditemukan: ${draft.eventSlug}` };
    }

    if (event.registration_open === false) {
      return { success: false, error: "Pendaftaran untuk event ini sudah ditutup." };
    }

    // Step 2: Insert registration
    const { data: registration, error: regError } = await supabaseAdmin
      .from("registrations")
      .insert({
        event_id: event.id,
        registration_code: registrationCode,
        status: "PENDING",
      })
      .select("id")
      .single();

    if (regError || !registration) {
      return { success: false, error: `Gagal membuat data pendaftaran: ${regError?.message}` };
    }

    // Step 3: Insert participant
    const { error: participantError } = await supabaseAdmin
      .from("participants")
      .insert({
        registration_id: registration.id,
        full_name: draft.participant.fullName,
        email: draft.participant.email,
        whatsapp: draft.participant.whatsapp,
        institution: draft.participant.institution,
        metadata: draft.participant.metadata || null,
      });

    if (participantError) {
      // Rollback: delete the registration we just created
      await supabaseAdmin.from("registrations").delete().eq("id", registration.id);
      return { success: false, error: `Gagal menyimpan data peserta: ${participantError.message}` };
    }

    return {
      success: true,
      registrationId: registration.id,
      registrationCode: registrationCode,
    };
  } catch (err: any) {
    console.error("[Data Layer] Registration Exception:", err);
    return { success: false, error: `Kesalahan server: ${err?.message || "Unknown"}` };
  }
}
