import { RegistrationDraft } from "@/lib/types/registration";
import { EventData } from "@/data/events";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { User, Mail, Phone, Building2, Calendar, MapPin, Tag } from "lucide-react";
import React from "react";

interface StepReviewProps {
  draft: RegistrationDraft;
  event: EventData;
  onEditStep: (step: number) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function StepReview({ draft, event, onEditStep, onSubmit, isSubmitting = false }: StepReviewProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-bold text-white mb-3">Tinjau Pendaftaran</h2>
        <p className="text-white/70">
          {event.price?.toLowerCase() === 'gratis' 
            ? "Periksa kembali data Anda sebelum mengonfirmasi pendaftaran." 
            : "Periksa kembali data Anda sebelum melanjutkan ke pembayaran."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Summary */}
        <GlassCard variant="medium" className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
            <button 
              onClick={() => onEditStep(1)}
              className="text-xs font-semibold text-brand-accent hover:text-white transition-colors uppercase tracking-wider"
            >
              Edit
            </button>
          </div>
          
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-6">Detail Acara</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-white font-heading text-xl font-bold mb-1">{event.title}</p>
              <div className="inline-block px-2 py-1 rounded border border-brand-accent/30 bg-brand-accent/10 text-brand-accent text-xs font-medium">
                {event.category}
              </div>
            </div>

            {event.date && (
              <div className="flex items-center gap-3 text-white/80">
                <Calendar size={16} className="text-brand-primary" />
                <span className="text-sm">{event.date}</span>
              </div>
            )}
            
            {event.location && (
              <div className="flex items-center gap-3 text-white/80">
                <MapPin size={16} className="text-brand-primary" />
                <span className="text-sm">{event.location}</span>
              </div>
            )}
            
            <div className="flex items-center gap-3 text-white/80">
              <Tag size={16} className="text-brand-primary" />
              <span className="text-sm font-medium">
                {event.price || "Menunggu Informasi Biaya"}
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Participant Summary */}
        <GlassCard variant="medium" className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
            <button 
              onClick={() => onEditStep(2)}
              className="text-xs font-semibold text-brand-accent hover:text-white transition-colors uppercase tracking-wider"
            >
              Edit
            </button>
          </div>
          
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-6">Data Peserta</h3>
          
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <User size={18} className="text-brand-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-white/50 mb-0.5">Nama Lengkap</p>
                <p className="text-sm font-medium text-white/90">{draft.participant.fullName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={18} className="text-brand-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-white/50 mb-0.5">Email</p>
                <p className="text-sm font-medium text-white/90">{draft.participant.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={18} className="text-brand-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-white/50 mb-0.5">WhatsApp</p>
                <p className="text-sm font-medium text-white/90">{draft.participant.whatsapp}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 size={18} className="text-brand-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-white/50 mb-0.5">Asal Institusi</p>
                <p className="text-sm font-medium text-white/90">{draft.participant.institution}</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between pt-8 border-t border-white/10 mt-8 gap-4">
        <Button 
          variant="glass" 
          size="lg" 
          onClick={() => onEditStep(2)}
          className="w-full sm:w-auto px-8"
        >
          Kembali
        </Button>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-10 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isSubmitting 
              ? "Memproses..." 
              : (event.price?.toLowerCase() === 'gratis' ? "Daftar Sekarang" : "Lanjut ke Pembayaran")}
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  );
}
