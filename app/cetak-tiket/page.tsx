"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { OFFICIAL_EVENTS as events } from '@/data/events';
import { createClient } from '@/lib/supabase/client';
import { StepETicket } from '@/components/registration/StepETicket';
import { AlertCircle, Search, Ticket, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CetakTiketPage() {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [waInput, setWaInput] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Data for rendering ticket
  const [ticketData, setTicketData] = useState<{
    event: any;
    draft: any;
    successResult: { code: string; id: string };
  } | null>(null);

  const getLabel = () => {
    if (!selectedEvent) return { name: 'Nama', wa: 'No. WhatsApp' };
    const evt = events.find(e => e.slug === selectedEvent);
    if (!evt) return { name: 'Nama Lengkap', wa: 'No. WhatsApp' };
    
    if (evt.slug.includes('futsal') || evt.slug === 'mlbb' || evt.slug.includes('esport')) {
      return { name: 'Nama Kapten', wa: 'No. WhatsApp Kapten' };
    }
    
    return { name: 'Nama Lengkap', wa: 'No. WhatsApp' };
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !nameInput || !waInput) {
      setErrorMsg('Harap lengkapi semua bidang.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMsg('');
      const supabase = createClient();
      
      const targetEvent = events.find(ev => ev.slug === selectedEvent);
      if (!targetEvent) throw new Error("Event tidak valid");

      // Kumpulkan slug event ini dan semua sub-event-nya (misal Futsal SLTA & Umum)
      const validSlugs = [targetEvent.slug];
      const subEvents = events.filter(e => e.parentId === targetEvent.id);
      subEvents.forEach(sub => validSlugs.push(sub.slug));

      // Cari partisipan berdasarkan event slug
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

      if (error) throw error;

      if (!regs || regs.length === 0) {
        throw new Error('Data tidak ditemukan.');
      }

      // Filter berdasarkan nama & WA secara manual agar lebih fleksibel
      const matchedReg = regs.find(reg => {
        const p = reg.participants as any;
        if (!p) return false;
        
        let dbName = p.full_name;
        let dbWa = p.whatsapp;

        // Jika e-sport atau futsal, nama/wa kapten mungkin ada di metadata
        if (selectedEvent.includes('futsal') || selectedEvent.includes('esport') || selectedEvent === 'mlbb') {
          if (p.metadata?.teamData?.captainName) {
            dbName = p.metadata.teamData.captainName;
          } else if (p.metadata?.players?.[0]?.name) {
            dbName = p.metadata.players[0].name;
          }

          if (p.metadata?.teamData?.captainWhatsapp) {
            dbWa = p.metadata.teamData.captainWhatsapp;
          }
        }

        // Bandingkan dengan toleransi case-insensitive dan tanpa spasi
        const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '');
        
        return normalize(dbName) === normalize(nameInput) && normalize(dbWa) === normalize(waInput);
      });

      if (!matchedReg) {
        throw new Error('Data tidak ditemukan. Pastikan Nama dan No. WhatsApp sama persis dengan saat pendaftaran.');
      }

      const p = matchedReg.participants as any;
      
      const draftData = {
        eventSlug: targetEvent.slug,
        participant: {
          fullName: p.full_name,
          email: p.email,
          whatsapp: p.whatsapp,
          institution: p.institution,
          metadata: p.metadata
        }
      };

      setTicketData({
        event: targetEvent,
        draft: draftData,
        successResult: { code: matchedReg.registration_code, id: matchedReg.id }
      });

    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat mencari tiket.');
    } finally {
      setIsLoading(false);
    }
  };

  const labels = getLabel();

  return (
    <div className="min-h-screen bg-[#0a192f]">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          
          {ticketData ? (
            <div className="space-y-6">
              <button 
                onClick={() => setTicketData(null)}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
              >
                <ChevronLeft size={20} />
                Kembali ke Pencarian
              </button>
              <StepETicket 
                event={ticketData.event}
                draft={ticketData.draft}
                successResult={ticketData.successResult}
              />
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
              <div className="text-center space-y-4 mb-10">
                <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(245,183,22,0.2)]">
                  <Ticket className="w-8 h-8 text-brand-accent" />
                </div>
                <h1 className="font-heading text-3xl font-bold text-white text-glow">Cetak Ulang E-Ticket</h1>
                <p className="text-white/60">
                  Pernah mendaftar tetapi lupa menyimpan E-Ticket? Jangan khawatir, Anda dapat mengunduhnya kembali di sini.
                </p>
              </div>

              <form onSubmit={handleSearch} className="space-y-6 max-w-xl mx-auto">
                {errorMsg && (
                  <div className="p-4 bg-status-warning/10 border border-status-warning/20 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-status-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-status-warning">{errorMsg}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">Pilih Event yang Diikuti</label>
                  <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-[#0f172a] border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none"
                    required
                  >
                    <option value="" disabled>-- Pilih Event --</option>
                    {events.filter(e => !e.isSubEvent).map(evt => (
                      <option key={evt.id} value={evt.slug}>{evt.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">{labels.name}</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder={`Masukkan ${labels.name} sesuai pendaftaran`}
                    className="w-full h-12 px-4 rounded-xl bg-[#0f172a] border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/90">{labels.wa}</label>
                  <input
                    type="text"
                    value={waInput}
                    onChange={(e) => setWaInput(e.target.value)}
                    placeholder={`Masukkan ${labels.wa} sesuai pendaftaran`}
                    className="w-full h-12 px-4 rounded-xl bg-[#0f172a] border border-white/20 text-white focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-12 shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Mencari Tiket...' : (
                    <>
                      <Search size={18} />
                      Cari Tiket Saya
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
