"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface EventRegistrationButtonProps {
  slug: string;
  category?: string;
  href?: string;
  className?: string;
  variant?: "card" | "hero";
  status?: string;
  isQuotaFull?: boolean;
}

// Target Pendaftaran Gelombang ke-2: 15 Oktober 2026, 21:30:00 WIB
const WAVE_2_START_TIME = new Date("2026-10-15T21:30:00+07:00").getTime();

export function isWave2CountdownEvent(slug?: string, category?: string): boolean {
  if (!slug) return false;
  // Kecualikan Seminar dan MTQ (Lomba Keagamaan)
  if (slug === "seminar-nasional" || slug === "lomba-keagamaan") {
    return false;
  }
  if (category?.toLowerCase() === "seminar") {
    return false;
  }
  return true;
}

interface TimeLeft {
  d: number;
  h: number;
  m: number;
  s: number;
}

export function EventRegistrationButton({
  slug,
  category,
  href,
  className,
  variant = "card",
  status,
  isQuotaFull: propIsQuotaFull,
}: EventRegistrationButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isPending, setIsPending] = useState(false);

  const isQuotaFull = propIsQuotaFull || status === "Closed" || slug.startsWith("open-bazaar");
  const isEligible = !isQuotaFull && isWave2CountdownEvent(slug, category);

  useEffect(() => {
    setMounted(true);

    if (!isEligible) return;

    const calculateCountdown = () => {
      const now = Date.now();
      const diff = WAVE_2_START_TIME - now;

      if (diff > 0) {
        setIsPending(true);
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / (1000 * 60)) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      } else {
        setIsPending(false);
        setTimeLeft(null);
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, [isEligible]);

  const defaultHref = variant === "hero" ? `/registration?event=${slug}` : `/events/${slug}`;
  const targetHref = href || defaultHref;

  const formatCardTime = (t: TimeLeft) => {
    if (t.d > 0) {
      return `${t.d}h ${t.h}j ${t.m}m ${t.s}d`;
    }
    if (t.h > 0) {
      return `${t.h}j ${t.m}m ${t.s}d`;
    }
    return `${t.m}m ${String(t.s).padStart(2, "0")}d`;
  };

  const formatHeroTime = (t: TimeLeft) => {
    if (t.d > 0) {
      return `${t.d} Hari : ${String(t.h).padStart(2, "0")} Jam : ${String(t.m).padStart(2, "0")} Menit : ${String(t.s).padStart(2, "0")} Detik`;
    }
    if (t.h > 0) {
      return `${t.h} Jam : ${String(t.m).padStart(2, "0")} Menit : ${String(t.s).padStart(2, "0")} Detik`;
    }
    return `${t.m} Menit : ${String(t.s).padStart(2, "0")} Detik`;
  };

  // Jika Kuota Habis / Pendaftaran Ditutup
  if (isQuotaFull) {
    if (variant === "hero") {
      return (
        <div className={cn("w-full sm:w-auto block cursor-not-allowed", className)}>
          <Button
            disabled
            size="lg"
            variant="ghost"
            className="w-full sm:w-64 border border-red-500/30 bg-red-500/10 text-red-300 cursor-not-allowed shadow-[0_0_20px_rgba(239,68,68,0.15)] whitespace-nowrap select-none disabled:opacity-90 disabled:pointer-events-none hover:border-red-500/30 hover:text-red-300"
          >
            <span className="text-red-300 font-bold tracking-wider text-base [text-shadow:0_0_10px_rgba(248,113,113,0.85),0_0_20px_rgba(239,68,68,0.45)]">
              Kuota Habis
            </span>
          </Button>
        </div>
      );
    }

    return (
      <div className="w-full mt-auto block cursor-not-allowed">
        <Button
          disabled
          variant="ghost"
          className={cn(
            "w-full text-sm font-semibold border border-red-500/30 bg-red-500/10 text-red-300 cursor-not-allowed shadow-[0_0_15px_rgba(239,68,68,0.15)] select-none disabled:opacity-90 disabled:pointer-events-none hover:border-red-500/30 hover:text-red-300 group-hover:border-red-500/30 group-hover:text-red-300",
            className
          )}
        >
          <span className="text-red-300 font-bold tracking-wider text-sm [text-shadow:0_0_8px_rgba(248,113,113,0.85),0_0_18px_rgba(239,68,68,0.45)]">
            Kuota Habis
          </span>
        </Button>
      </div>
    );
  }

  // Jika event adalah non-Seminar & non-MTQ dan masih sebelum jam 21:30 WIB
  if (isEligible && (isPending || !mounted)) {
    if (variant === "card") {
      return (
        <Link href={targetHref} className="w-full mt-auto block group/btn">
          <div
            className={cn(
              "w-full rounded-[var(--radius-md)] border border-amber-400/40 bg-gradient-to-r from-amber-500/15 via-brand-accent/20 to-amber-500/15 backdrop-blur-md px-3 py-2.5 transition-all duration-300 group-hover/btn:border-brand-accent group-hover/btn:shadow-[0_0_20px_rgba(245,183,22,0.3)] flex flex-col items-center justify-center text-center",
              className
            )}
          >
            <span className="text-[11px] sm:text-xs font-semibold text-white/95 uppercase tracking-wide leading-tight mb-1">
              Pendaftaran Gelombang ke-2 Dimulai :
            </span>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-accent font-mono tracking-wider drop-shadow-[0_0_10px_rgba(245,183,22,0.5)]">
              <Clock size={13} className="text-brand-accent animate-pulse" />
              {timeLeft ? (
                <span>{formatCardTime(timeLeft)}</span>
              ) : (
                <span className="opacity-75">Menghitung...</span>
              )}
            </div>
          </div>
        </Link>
      );
    }

    // Variant Hero (Halaman detail event)
    return (
      <div className={cn("w-full sm:w-auto block", className)}>
        <div className="w-full sm:w-auto min-w-[280px] sm:min-w-[340px] px-6 py-3.5 rounded-[var(--radius-pill)] border border-amber-400/50 bg-gradient-to-r from-amber-500/20 via-brand-accent/25 to-amber-500/20 backdrop-blur-xl shadow-[0_0_25px_rgba(245,183,22,0.25)] flex flex-col items-center justify-center text-center">
          <span className="text-xs sm:text-sm font-semibold text-white/95 uppercase tracking-wider mb-1">
            Pendaftaran Gelombang ke-2 Dimulai :
          </span>
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-brand-accent font-mono tracking-wider drop-shadow-[0_0_12px_rgba(245,183,22,0.6)]">
            <Clock size={16} className="text-brand-accent animate-pulse" />
            {timeLeft ? (
              <span>{formatHeroTime(timeLeft)}</span>
            ) : (
              <span>Menghitung...</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Kondisi Normal: Seminar, MTQ, atau setelah jam 21:30 WIB (Pendaftaran telah dibuka kembali)
  if (variant === "hero") {
    return (
      <Link href={targetHref} className={cn("w-full sm:w-auto block", className)}>
        <Button size="lg" variant="primary" className="w-full sm:w-64 shadow-lg shadow-brand-accent/20 whitespace-nowrap">
          Daftar Sekarang
        </Button>
      </Link>
    );
  }

  return (
    <Link href={targetHref} className="w-full mt-auto block">
      <Button
        variant="ghost"
        className={cn(
          "w-full border border-white/20 group-hover:border-brand-accent group-hover:text-brand-accent transition-all duration-300 glass-medium",
          className
        )}
      >
        Daftar Sekarang
      </Button>
    </Link>
  );
}
