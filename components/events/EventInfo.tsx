import { EventData } from "@/data/events";
import { GlassCard } from "@/components/ui/GlassCard";
import { Calendar, Clock, MapPin, Tag, CheckCircle2, Hourglass, Gift, Phone } from "lucide-react";
import React from "react";
import { RegistrationCountdown } from "./RegistrationCountdown";

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

        {/* Benefits */}
        {event.benefits && event.benefits.length > 0 && (
          <GlassCard variant="light" className="p-8 md:p-10 mt-8">
            <h2 className="font-heading text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Gift className="text-brand-accent" size={32} />
              Penghargaan & Benefit
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Gift className="text-brand-accent shrink-0 mt-0.5" size={20} />
                  <span className="text-white/90 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
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
                  {event.status === "Open" && event.registrationCloseDate ? (
                    <RegistrationCountdown targetDate={event.registrationCloseDate} />
                  ) : (
                    event.status
                  )}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Timeline */}
        {event.timeline && event.timeline.length > 0 && (
          <GlassCard variant="strong" className="p-6 md:p-8">
            <h3 className="font-heading text-xl font-semibold text-white mb-5 flex items-center gap-2 border-b border-white/10 pb-4">
              <Hourglass className="text-brand-accent" size={20} />
              Timeline Acara
            </h3>
            <div className="space-y-4">
              {event.timeline.map((item, i) => (
                <div key={i} className="relative pl-6 before:absolute before:left-2 before:top-2 before:w-2 before:h-2 before:bg-brand-accent before:rounded-full after:absolute after:left-[11px] after:top-5 after:bottom-[-16px] after:w-px after:bg-white/20 last:after:hidden">
                  <p className="text-sm text-white/50 mb-0.5">{item.title}</p>
                  <p className="text-white/90 font-medium">{item.date}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Contacts */}
        {event.contacts && event.contacts.length > 0 && (
          <GlassCard variant="strong" className="p-6 md:p-8">
            <h3 className="font-heading text-xl font-semibold text-white mb-5 flex items-center gap-2 border-b border-white/10 pb-4">
              <Phone className="text-brand-accent" size={20} />
              Contact Person
            </h3>
            <div className="space-y-4">
              {event.contacts.map((contact, i) => (
                <a key={i} href={`https://wa.me/${contact.phone.replace(/^0/, '62')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-white/90 font-medium text-sm">{contact.name}</p>
                    <p className="text-sm text-white/50">{contact.phone}</p>
                  </div>
                  <div className="ml-auto text-xs font-medium text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full group-hover:bg-green-500 group-hover:text-white transition-colors">
                    Chat WA
                  </div>
                </a>
              ))}
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
