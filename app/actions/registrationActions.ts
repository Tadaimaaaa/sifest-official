"use server";

import { RegistrationDraft } from "@/lib/types/registration";
import { submitRegistration, RegistrationResult } from "@/lib/data/registrations";
import { getAllEvents } from "@/lib/events";

/**
 * Server Action for submitting a registration.
 * Performs server-side validation before hitting the database.
 */
export async function registerParticipant(draft: RegistrationDraft): Promise<RegistrationResult> {
  try {
    // 1. Basic Field Validation
    if (!draft.eventSlug) {
      return { success: false, error: "Acara belum dipilih." };
    }
    if (!draft.participant.fullName.trim()) {
      return { success: false, error: "Nama lengkap wajib diisi." };
    }
    if (!draft.participant.email.trim()) {
      return { success: false, error: "Email wajib diisi." };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(draft.participant.email)) {
      return { success: false, error: "Format email tidak valid." };
    }
    
    if (!draft.participant.whatsapp.trim()) {
      return { success: false, error: "Nomor WhatsApp wajib diisi." };
    }
    
    const phoneRegex = /^[+0-9]{9,15}$/;
    if (!phoneRegex.test(draft.participant.whatsapp.replace(/\s+/g, ""))) {
      return { success: false, error: "Format nomor WhatsApp tidak valid." };
    }

    if (!draft.participant.institution.trim()) {
      return { success: false, error: "Asal institusi wajib diisi." };
    }

    // 2. Validate Event (ensure it's a real event from our catalog)
    // We check against the static catalog to ensure they aren't passing a fake slug.
    const allEvents = getAllEvents();
    const eventExists = allEvents.some((e) => e.slug === draft.eventSlug);
    if (!eventExists) {
      return { success: false, error: "Acara yang dipilih tidak valid." };
    }

    // 3. Submit to Database Data Layer
    const result = await submitRegistration(draft);
    return result;

  } catch (error) {
    console.error("[Server Action] registration error:", error);
    return { success: false, error: "Terjadi kesalahan pada server saat memproses pendaftaran." };
  }
}
