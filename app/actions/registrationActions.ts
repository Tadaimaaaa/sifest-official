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
      return { success: false, error: "Data wajib diisi." };
    }

    // Custom Validation for Futsal SLTA
    if (draft.eventSlug.startsWith('turnamen-futsal')) {
      const meta = draft.participant.metadata;
      if (!meta) {
        return { success: false, error: "Data sekolah dan data pemain wajib diisi." };
      }
      
      const school = meta.schoolData;
      if (!school || !school.schoolName || !school.level || !school.address || !school.city || !school.coachName || !school.coachWhatsapp) {
        return { success: false, error: "Semua kolom Data Sekolah wajib diisi." };
      }

      const players = meta.players;
      if (!players || !Array.isArray(players) || players.length === 0) {
        return { success: false, error: "Minimal harus ada 1 data pemain." };
      }
      for (let i = 0; i < players.length; i++) {
        const p = players[i];
        if (!p.name || !p.nisn) {
          return { success: false, error: "Nama dan NISN setiap pemain wajib diisi." };
        }
        if (i === 0 && !p.whatsapp) {
          return { success: false, error: "Nomor WhatsApp Pemain 1 (Kapten) wajib diisi." };
        }
      }
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
