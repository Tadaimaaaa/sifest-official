"use server";

import { createClient } from "@supabase/supabase-js";
import { OFFICIAL_EVENTS as events } from "@/data/events";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function checkTicketData(selectedEventSlug: string, nameInput: string, waInput: string) {
  try {
    const targetEvent = events.find(ev => ev.slug === selectedEventSlug);
    if (!targetEvent) return { error: "Event tidak valid" };

    const validSlugs = [targetEvent.slug];
    const subEvents = events.filter(e => e.isSubEvent && e.slug.startsWith(targetEvent.slug + '-'));
    subEvents.forEach(sub => validSlugs.push(sub.slug));

    const { data: regs, error } = await supabase
      .from('registrations')
      .select(`
        id,
        registration_code,
        event_id,
        participants (
          id,
          full_name,
          email,
          whatsapp,
          institution,
          metadata
        ),
        events!inner (
          slug
        )
      `)
      .in('events.slug', validSlugs);

    if (error) {
      return { error: error.message };
    }

    if (!regs || regs.length === 0) {
      return { error: "Data tidak ditemukan." };
    }

    const matchedReg = regs.find(reg => {
      const p = reg.participants as any;
      if (!p) return false;
      
      let dbName = p.full_name;
      let dbWa = p.whatsapp;

      if (selectedEventSlug.includes('futsal') || selectedEventSlug.includes('esport') || selectedEventSlug === 'mlbb') {
        if (p.metadata?.teamData?.captainName) {
          dbName = p.metadata.teamData.captainName;
        } else if (p.metadata?.players?.[0]?.name) {
          dbName = p.metadata.players[0].name;
        }

        if (p.metadata?.teamData?.captainWhatsapp) {
          dbWa = p.metadata.teamData.captainWhatsapp;
        }
      }

      const normalize = (str: string) => (str || "").toLowerCase().replace(/\s+/g, '');
      
      return normalize(dbName) === normalize(nameInput) && normalize(dbWa) === normalize(waInput);
    });

    if (!matchedReg) {
      return { error: "Data tidak ditemukan. Pastikan Nama dan No. WhatsApp sama persis dengan saat pendaftaran." };
    }

    const p = matchedReg.participants as any;
    
    return {
      success: true,
      draftData: {
        eventSlug: targetEvent.slug,
        participant: {
          fullName: p.full_name,
          email: p.email,
          whatsapp: p.whatsapp,
          institution: p.institution,
          metadata: p.metadata
        }
      },
      successResult: {
        code: matchedReg.registration_code,
        id: matchedReg.id
      }
    };
  } catch (err: any) {
    return { error: err.message || "Terjadi kesalahan sistem." };
  }
}
