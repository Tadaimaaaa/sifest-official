"use server";
import { createClient } from "@supabase/supabase-js";
import { RegistrationDraft } from "@/lib/types/registration";
import crypto from "crypto";

// Use anon key for registration (with RLS policies allowing insert)
const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
    const { data: event, error: eventError } = await supabasePublic
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
    const { data: registration, error: regError } = await supabasePublic
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
    const { error: participantError } = await supabasePublic
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
      await supabasePublic.from("registrations").delete().eq("id", registration.id);
      return { success: false, error: `Gagal menyimpan data peserta: ${participantError.message}` };
    }

    // Step 4: Auto-create transaction for FREE events
    // We check the imported catalog to see if the event is free:
    const allEvents = (await import("@/lib/events")).getAllEvents();
    const eventCatalogData = allEvents.find(e => e.slug === draft.eventSlug);
    const isGratis = eventCatalogData?.price?.toLowerCase().includes("gratis") || 
                     eventCatalogData?.price?.toLowerCase() === "free" || 
                     eventCatalogData?.price === "Rp 0";

    if (isGratis) {
      const { error: txError } = await supabasePublic
        .from("transactions")
        .insert({
          registration_id: registration.id,
          amount: 0,
          status: "PAID",
          payment_method: "FREE",
          provider: "SYSTEM",
          paid_at: new Date().toISOString()
        });
      
      if (txError) {
        console.error("Gagal membuat transaksi FREE:", txError);
      } else {
        // Automatically mark registration as confirmed
        await supabasePublic.from("registrations").update({ status: "CONFIRMED" }).eq("id", registration.id);
      }
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
