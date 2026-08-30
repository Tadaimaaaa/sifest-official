import { EventData } from "@/data/events";
import { GlassCard } from "@/components/ui/GlassCard";
import { Calendar, Clock, MapPin, Tag, CheckCircle2 } from "lucide-react";
import React from "react";

export function EventInfo({ event }: { event: EventData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Description */}
      <div className="lg:col-span-2 space-y-8">
        <GlassCard variant="light" className="p-8 md:p-10">
          <h2 className="font-heading text-3xl font-bold text-white mb-6">Tentang Acara</h2>
          <div className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed">
            <p>{event.description}</p>
          </div>
        </GlassCard>

        {/* Requirements - Only show if data exists, otherwise show placeholder state for dev */}
        <GlassCard variant="light" className="p-8 md:p-10">
          <h2 className="font-heading text-3xl font-bold text-white mb-6">Persyaratan & Informasi Tambahan</h2>
          {event.requirements && event.requirements.length > 0 ? (
            <ul className="space-y-4">
              {event.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-brand-accent shrink-0 mt-1" size={20} />
                  <span className="text-white/80 text-lg">{req}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 border border-dashed border-white/20 rounded-2xl bg-white/5">
              <p className="text-white/50 text-lg">
                Detail persyaratan sedang dalam tahap finalisasi oleh panitia.
                <br />
                Pantau terus pembaruan informasi di sini.
              </p>
            </div>
          )}
        </GlassCard>
      </div>

      {/* Info Sidebar */}
      <div className="space-y-6">
        <GlassCard variant="strong" className="p-6 md:p-8 sticky top-24">
          <h3 className="font-heading text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Detail Pelaksanaan</h3>
          
          <div className="space-y-6">
            {event.date && (
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-brand-primary/20 text-brand-primary shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-sm text-white/50 mb-1">Tanggal</p>
                  <p className="text-white/90 font-medium text-lg">{event.date}</p>
                </div>
              </div>
            )}

            {event.time && (
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-brand-primary/20 text-brand-primary shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm text-white/50 mb-1">Waktu</p>
                  <p className="text-white/90 font-medium text-lg">{event.time}</p>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-brand-primary/20 text-brand-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-white/50 mb-1">Lokasi</p>
                  <p className="text-white/90 font-medium text-lg">{event.location}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-brand-primary/20 text-brand-primary shrink-0">
                <Tag size={24} />
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Status Pendaftaran</p>
                <div className="inline-flex mt-1 items-center px-3 py-1 rounded-full text-xs font-semibold bg-status-success/20 text-status-success border border-status-success/30">
                  {event.status}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
