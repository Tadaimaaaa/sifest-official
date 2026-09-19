"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function RegistrationCountdown({ 
  startDate, 
  closeDate,
  phases,
  variant = "inline"
}: { 
  startDate?: string; 
  closeDate: string;
  phases?: { name: string; startDate: string; endDate: string }[];
  variant?: "inline" | "hero";
}) {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const [status, setStatus] = useState<"pending" | "open" | "closed">("open");
  const [statusText, setStatusText] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      let targetTime = 0;
      let newStatus: "pending" | "open" | "closed" = "closed";
      let text = "";

      if (phases && phases.length > 0) {
        const currentPhase = phases.find(p => {
          const start = new Date(p.startDate).getTime();
          const end = new Date(p.endDate).getTime();
          return now >= start && now <= end;
        });

        if (currentPhase) {
          newStatus = "open";
          text = `Buka (${currentPhase.name})`;
          targetTime = 0; 
        } else {
          const nextPhase = phases.find(p => new Date(p.startDate).getTime() > now);
          if (nextPhase) {
            newStatus = "pending";
            text = "Buka dalam";
            targetTime = new Date(nextPhase.startDate).getTime();
          } else {
            newStatus = "closed";
            text = "Pendaftaran Ditutup";
          }
        }
      } else {
        const startTime = startDate ? new Date(startDate).getTime() : 0;
        const closeTime = new Date(closeDate).getTime();

        if (startTime > now) {
          newStatus = "pending";
          text = "Buka dalam";
          targetTime = startTime;
        } else if (closeTime > now) {
          newStatus = "open";
          text = "Sisa";
          targetTime = closeTime;
        } else {
          newStatus = "closed";
          text = "Pendaftaran Ditutup";
        }
      }

      setStatus(newStatus);
      setStatusText(text);

      if (targetTime > 0) {
        const diff = targetTime - now;
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [startDate, closeDate, phases]);

  if (!mounted) return <span className="opacity-50">Menghitung...</span>;

  if (status === "closed") {
    if (variant === "hero") {
      return (
        <div className="flex items-center gap-3 bg-red-500/10 text-red-400 p-4 rounded-xl border border-red-500/20">
          <Clock className="w-6 h-6" />
          <span className="text-xl font-bold uppercase tracking-widest">Pendaftaran Ditutup</span>
        </div>
      );
    }
    return <span className="text-red-400 font-medium">Pendaftaran Ditutup</span>;
  }

  if (variant === "hero") {
    return (
      <div className="flex flex-col items-center sm:items-start gap-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent font-semibold uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(245,183,22,0.2)]">
          <Clock className="w-4 h-4 animate-pulse" />
          {statusText}
        </div>
        
        {timeLeft && (
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 backdrop-blur-md shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-white text-glow">{timeLeft.d}</span>
              <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest mt-1">Hari</span>
            </div>
            <span className="text-2xl sm:text-3xl font-bold text-white/20 animate-pulse">:</span>
            <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 backdrop-blur-md shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-white text-glow">{timeLeft.h}</span>
              <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest mt-1">Jam</span>
            </div>
            <span className="text-2xl sm:text-3xl font-bold text-white/20 animate-pulse">:</span>
            <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 backdrop-blur-md shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-white text-glow">{timeLeft.m}</span>
              <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest mt-1">Menit</span>
            </div>
            <span className="text-2xl sm:text-3xl font-bold text-white/20 animate-pulse">:</span>
            <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 backdrop-blur-md shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-brand-accent text-glow">{timeLeft.s}</span>
              <span className="text-[10px] sm:text-xs text-brand-accent/70 uppercase tracking-widest mt-1">Detik</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Inline variant
  return (
    <span className="flex items-center gap-1.5 font-medium">
      <Clock size={14} className={status === "open" ? "text-brand-accent" : "text-amber-400"} />
      <span className={status === "open" ? "text-white/90" : "text-amber-400/90"}>{statusText}:</span>
      {timeLeft && (
        <span className={status === "open" ? "text-brand-accent" : "text-amber-400 font-bold"}>
          {timeLeft.d}h {timeLeft.h}j {timeLeft.m}m {timeLeft.s}d
        </span>
      )}
    </span>
  );
}
