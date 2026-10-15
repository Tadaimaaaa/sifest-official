"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Clock } from "lucide-react";
import { EventData } from "@/data/events";

// Target date for Gelombang 2: 17 Oktober 2026 00:00:00 WIB (UTC+7)
const TARGET_DATE_STRING = "2026-10-17T00:00:00+07:00";

/**
 * Checks if an event is exempt from the countdown (Seminar and MTQ/Keagamaan)
 */
export function isExemptFromCountdown(event: { slug?: string; title?: string; category?: string }): boolean {
  const slug = (event.slug || "").toLowerCase();
  const title = (event.title || "").toLowerCase();
  const category = (event.category || "").toLowerCase();

  // Exclude Seminar
  if (slug.includes("seminar") || title.includes("seminar") || category.includes("seminar")) {
    return true;
  }

  // Exclude MTQ / Keagamaan
  if (
    slug.includes("mtq") || 
    slug.includes("keagamaan") || 
    title.includes("mtq") || 
    title.includes("keagamaan")
  ) {
    return true;
  }

  return false;
}

interface EventRegistrationButtonProps {
  event: EventData;
  variant?: "card" | "hero";
  className?: string;
}

export function EventRegistrationButton({
  event,
  variant = "card",
  className = "",
}: EventRegistrationButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const isExempt = isExemptFromCountdown(event);

  useEffect(() => {
    setMounted(true);

    if (isExempt) {
      setIsCountdownActive(false);
      return;
    }

    const calculateCountdown = () => {
      const now = new Date().getTime();
      const targetTime = new Date(TARGET_DATE_STRING).getTime();
      const diff = targetTime - now;

      if (diff > 0) {
        setIsCountdownActive(true);
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / (1000 * 60)) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      } else {
        // Countdown has finished, Gelombang 2 is open!
        setIsCountdownActive(false);
        setTimeLeft(null);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isExempt]);

  // Card variant (homepage and /events cards)
  if (variant === "card") {
    // If exempt (Seminar or MTQ), or after countdown expires, show regular button
    if (isExempt || !isCountdownActive) {
      return (
        <Link href={`/events/${event.slug}`} className="w-full mt-auto block">
          <Button
            variant="ghost"
            className={`w-full min-h-[52px] border border-white/20 group-hover:border-brand-accent group-hover:text-brand-accent transition-all duration-300 glass-medium ${className}`}
          >
            Daftar Sekarang
          </Button>
        </Link>
      );
    }

    // Active countdown button for non-exempt events
    return (
      <Link href={`/events/${event.slug}`} className="w-full mt-auto block" title="Klik untuk melihat detail acara">
        <Button
          variant="ghost"
          className={`w-full min-h-[52px] py-1.5 px-3 border border-brand-accent/50 bg-brand-accent/10 hover:bg-brand-accent/20 group-hover:border-brand-accent transition-all duration-300 glass-medium flex flex-col items-center justify-center gap-0.5 ${className}`}
        >
          <span className="text-[10px] sm:text-[11px] font-semibold text-brand-accent tracking-wide uppercase flex items-center justify-center gap-1.5 leading-tight">
            <Clock className="w-3.5 h-3.5 animate-pulse text-brand-accent shrink-0" />
            Pendaftaran Gelombang ke-2 Dimulai :
          </span>
          <span className="text-xs sm:text-sm font-bold text-white font-mono tracking-wider leading-tight">
            {!mounted || !timeLeft ? (
              <span className="opacity-70 font-sans text-xs">Menghitung...</span>
            ) : (
              <>
                {timeLeft.d > 0 && `${timeLeft.d} Hari `}
                {String(timeLeft.h).padStart(2, "0")} Jam {String(timeLeft.m).padStart(2, "0")} Menit {String(timeLeft.s).padStart(2, "0")} Detik
              </>
            )}
          </span>
        </Button>
      </Link>
    );
  }

  // Hero variant (event detail page)
  if (isExempt || !isCountdownActive) {
    return (
      <Link href={`/registration?event=${event.slug}`} className="w-full sm:w-auto block">
        <Button
          size="lg"
          variant="primary"
          className={`w-full sm:w-64 min-h-[48px] shadow-lg shadow-brand-accent/20 whitespace-nowrap ${className}`}
        >
          Daftar Sekarang
        </Button>
      </Link>
    );
  }

  return (
    <div className="w-full sm:w-auto block">
      <Button
        size="lg"
        variant="glass"
        disabled
        className={`w-full sm:w-auto min-w-[280px] min-h-[48px] py-2 px-5 border border-brand-accent/50 bg-brand-accent/10 shadow-[0_0_25px_rgba(245,183,22,0.15)] cursor-not-allowed flex flex-col items-center justify-center gap-0.5 ${className}`}
      >
        <span className="text-[11px] sm:text-xs font-semibold text-brand-accent tracking-wide uppercase flex items-center gap-1.5 leading-tight">
          <Clock className="w-3.5 h-3.5 animate-pulse text-brand-accent shrink-0" />
          Pendaftaran Gelombang ke-2 Dimulai :
        </span>
        <span className="text-xs sm:text-sm font-bold text-white font-mono tracking-wider leading-tight">
          {!mounted || !timeLeft ? (
            <span className="opacity-70 font-sans text-xs">Menghitung...</span>
          ) : (
            <>
              {timeLeft.d > 0 && `${timeLeft.d} Hari `}
              {String(timeLeft.h).padStart(2, "0")} Jam {String(timeLeft.m).padStart(2, "0")} Menit {String(timeLeft.s).padStart(2, "0")} Detik
            </>
          )}
        </span>
      </Button>
    </div>
  );
}
