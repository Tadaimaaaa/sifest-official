import { ParticipantData } from "@/lib/types/registration";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

interface StepParticipantDataProps {
  data: ParticipantData;
  eventSlug: string;
  onUpdate: (data: ParticipantData) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepParticipantData({ data, eventSlug, onUpdate, onNext, onBack }: StepParticipantDataProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof ParticipantData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof ParticipantData, string>> = {};
    let isValid = true;

    if (!data.fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      newErrors.email = "Email wajib diisi.";
      isValid = false;
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Format email tidak valid.";
      isValid = false;
    }

    const phoneRegex = /^[+0-9]{9,15}$/;
    if (!data.whatsapp.trim()) {
      newErrors.whatsapp = "Nomor WhatsApp wajib diisi.";
      isValid = false;
    } else if (!phoneRegex.test(data.whatsapp.replace(/\s+/g, ""))) {
      newErrors.whatsapp = "Format nomor WhatsApp tidak valid (contoh: 0812...).";
      isValid = false;
    }

    if (!data.institution.trim()) {
      newErrors.institution = "Asal institusi wajib diisi.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-bold text-white mb-3">Data Peserta</h2>
        <p className="text-white/70">Pastikan data yang Anda masukkan sudah benar dan dapat dihubungi.</p>
      </div>

      <GlassCard variant="medium" className="p-6 md:p-8 space-y-6">
        {/* Full Name / Team Name */}
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-white/90">
            {eventSlug === 'turnamen-futsal' || eventSlug === 'turnamen-esport-mlbb' 
              ? "Nama Tim & Nama Kapten" 
              : eventSlug === 'open-bazaar'
                ? "Nama Brand / Usaha & Penanggung Jawab"
                : eventSlug === 'seminar-nasional'
                  ? "Nama Lengkap (Untuk Sertifikat)"
                  : "Nama Lengkap Peserta"} <span className="text-status-warning">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            value={data.fullName}
            onChange={(e) => onUpdate({ ...data, fullName: e.target.value })}
            placeholder={
              eventSlug === 'turnamen-futsal' || eventSlug === 'turnamen-esport-mlbb' 
                ? "Contoh: Tim Garuda - Budi Santoso"
                : eventSlug === 'open-bazaar'
                  ? "Contoh: Sate Taichan Senayan - Siti"
                  : "Masukkan nama lengkap Anda"
            }
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
          />
          {errors.fullName && (
            <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5">
              <AlertCircle size={14} /> {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-white/90">
            Email <span className="text-status-warning">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ ...data, email: e.target.value })}
            placeholder="email@contoh.com"
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
          />
          {errors.email && (
            <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5">
              <AlertCircle size={14} /> {errors.email}
            </p>
          )}
        </div>

        {/* WhatsApp */}
        <div className="space-y-2">
          <label htmlFor="whatsapp" className="block text-sm font-medium text-white/90">
            Nomor WhatsApp <span className="text-status-warning">*</span>
          </label>
          <input
            id="whatsapp"
            type="tel"
            value={data.whatsapp}
            onChange={(e) => onUpdate({ ...data, whatsapp: e.target.value })}
            placeholder="081234567890"
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
          />
          {errors.whatsapp && (
            <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5">
              <AlertCircle size={14} /> {errors.whatsapp}
            </p>
          )}
        </div>

        {/* Institution */}
        <div className="space-y-2">
          <label htmlFor="institution" className="block text-sm font-medium text-white/90">
            {eventSlug === 'open-bazaar' 
              ? "Kategori Usaha (F&B, Fashion, dll)" 
              : "Asal Institusi / Sekolah / Kampus"} <span className="text-status-warning">*</span>
          </label>
          <input
            id="institution"
            type="text"
            value={data.institution}
            onChange={(e) => onUpdate({ ...data, institution: e.target.value })}
            placeholder={
              eventSlug === 'open-bazaar' 
                ? "Contoh: Makanan & Minuman" 
                : "Universitas / SMA / Instansi"
            }
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
          />
          {errors.institution && (
            <p className="flex items-center gap-1.5 text-sm text-status-warning mt-1.5">
              <AlertCircle size={14} /> {errors.institution}
            </p>
          )}
        </div>
      </GlassCard>

      <div className="flex flex-col-reverse sm:flex-row justify-between pt-8 border-t border-white/10 mt-8 gap-4">
        <Button 
          variant="glass" 
          size="lg" 
          onClick={onBack}
          className="w-full sm:w-auto px-8"
        >
          Kembali
        </Button>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={handleNext}
          className="w-full sm:w-auto px-12"
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
