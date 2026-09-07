"use client";

import { EventData, RegistrationPhase } from "@/data/events";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { BookOpen, Gamepad2, GraduationCap, Store, Trophy, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const IconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={48} strokeWidth={1.5} className="text-brand-accent drop-shadow-md" />,
  Trophy: <Trophy size={48} strokeWidth={1.5} className="text-brand-accent drop-shadow-md" />,
  Gamepad2: <Gamepad2 size={48} strokeWidth={1.5} className="text-brand-accent drop-shadow-md" />,
  BookOpen: <BookOpen size={48} strokeWidth={1.5} className="text-brand-accent drop-shadow-md" />,
  Store: <Store size={48} strokeWidth={1.5} className="text-brand-accent drop-shadow-md" />,
};

export function EventCard({ event }: { event: EventData }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine button state and countdown
  let buttonState = "LOADING";
  let buttonText = "Loading...";
  let buttonHref = "#";
  let countdownText = "";
  let countdownTarget: Date | null = null;

  if (now) {
    if (event.status === "Closed") {
      buttonState = "CLOSED";
      buttonText = "Pendaftaran Ditutup";
    } else {
      const regStart = event.registrationStartDate ? new Date(event.registrationStartDate) : null;
      const regEnd = event.registrationCloseDate ? new Date(event.registrationCloseDate) : null;

      if (regStart && now < regStart) {
        buttonState = "COUNTDOWN";
        buttonText = "Belum Dibuka";
        countdownText = "Pendaftaran Dibuka Dalam:";
        countdownTarget = regStart;
      } else if (regEnd && now > regEnd) {
        buttonState = "CLOSED";
        buttonText = "Pendaftaran Ditutup";
      } else {
        // It's between start and end (or no start/end defined). Check phases.
        if (event.registrationPhases && event.registrationPhases.length > 0) {
          let currentPhase: RegistrationPhase | null = null;
          let nextPhase: RegistrationPhase | null = null;

          for (let i = 0; i < event.registrationPhases.length; i++) {
            const phaseStart = new Date(event.registrationPhases[i].startDate);
            const phaseEnd = new Date(event.registrationPhases[i].endDate);
            if (now >= phaseStart && now <= phaseEnd) {
              currentPhase = event.registrationPhases[i];
              break;
            } else if (now < phaseStart && (!nextPhase || phaseStart < new Date(nextPhase.startDate))) {
              nextPhase = event.registrationPhases[i];
            }
          }

          if (currentPhase) {
            buttonState = "OPEN";
            buttonText = `Daftar Sekarang (${currentPhase.name})`;
            buttonHref = `/events/${event.slug}`;
          } else if (nextPhase) {
            buttonState = "COUNTDOWN";
            buttonText = `Menunggu ${nextPhase.name}`;
            countdownText = `${nextPhase.name} Dibuka Dalam:`;
            countdownTarget = new Date(nextPhase.startDate);
          } else {
            // Gap without next phase? Fallback to generic open
            buttonState = "OPEN";
            buttonText = "Daftar Sekarang";
            buttonHref = `/events/${event.slug}`;
          }
        } else {
          // No phases, just generic open
          buttonState = "OPEN";
          buttonText = "Daftar Sekarang";
          buttonHref = `/events/${event.slug}`;
        }
      }
    }
  }

  const formatCountdown = (target: Date) => {
    if (!now) return "";
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) return "00:00:00:00";
    
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    
    return `${d.toString().padStart(2, '0')} Hari ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <GlassCard variant="medium" interactive className="flex flex-col items-center text-center group">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[var(--radius-pill)] glass-strong group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(245,183,22,0.3)] transition-all duration-300 overflow-hidden relative p-3">
        {event.image ? (
          <Image src={event.image} alt={event.title} fill className="object-contain p-2" />
        ) : (
          IconMap[event.icon]
        )}
      </div>
      <div className="mb-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-brand-accent backdrop-blur-md">
        {event.category}
      </div>
      <h3 className="font-heading text-2xl font-bold text-white mb-3 text-glow group-hover:text-brand-accent transition-colors duration-300">
        {event.title}
      </h3>
      <p className="text-white/70 mb-4 flex-grow">
        {event.shortDescription}
      </p>
      {event.price && (
        <div className="mb-6 px-4 py-2 rounded-lg bg-white/10 border border-white/20 w-full">
          <span className="text-xs text-white/90 block mb-1 uppercase tracking-wider font-semibold">Biaya Pendaftaran</span>
          {event.price.includes('\n') ? (
            <div className="flex flex-row justify-center items-center w-full mt-2">
              {event.price.split('\n').map((p, i) => {
                const parts = p.split(': ');
                return (
                  <div key={i} className={`flex flex-col items-center justify-center w-1/2 ${i > 0 ? 'border-l border-white/20' : ''}`}>
                    {parts.length > 1 ? (
                      <>
                        <span className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider mb-0.5">{parts[0]}</span>
                        <span className="text-sm sm:text-base font-bold text-brand-accent whitespace-nowrap">{parts[1]}</span>
                      </>
                    ) : (
                      <span className="text-sm sm:text-base font-bold text-brand-accent whitespace-nowrap">{p}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <span className="text-base font-bold text-brand-accent">{event.price}</span>
          )}
        </div>
      )}
      {buttonState === "COUNTDOWN" && countdownTarget && (
        <div className="w-full mb-6 py-2 px-3 bg-brand-primary/20 border border-brand-accent/30 rounded-lg flex flex-col items-center justify-center">
          <span className="text-[10px] text-white/70 uppercase tracking-widest mb-1">{countdownText}</span>
          <div className="flex items-center gap-2 text-brand-accent font-mono font-bold text-sm sm:text-base">
            <Clock className="w-4 h-4" />
            {formatCountdown(countdownTarget)}
          </div>
        </div>
      )}

      {buttonState === "OPEN" ? (
        <Link href={buttonHref} className="w-full mt-auto">
          <Button variant="ghost" className="w-full border border-white/20 group-hover:border-brand-accent group-hover:text-brand-accent transition-all duration-300 glass-medium">
            {buttonText}
          </Button>
        </Link>
      ) : (
        <Button disabled variant="ghost" className="w-full mt-auto border border-white/10 text-white/40 cursor-not-allowed bg-white/5">
          {buttonText}
        </Button>
      )}
    </GlassCard>
  );
}
