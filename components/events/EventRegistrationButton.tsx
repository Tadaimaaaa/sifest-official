"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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

// Batas Akhir Penutupan Pendaftaran: Tepat Jam 00:00 WIB (26 Oktober 2026)
export const REGISTRATION_CLOSE_TIME = new Date("2026-10-26T00:00:00+07:00").getTime();

export function isWave2CountdownEvent(slug?: string, category?: string): boolean {
  return false;
}

export function isRegistrationClosed(): boolean {
  return Date.now() >= REGISTRATION_CLOSE_TIME;
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
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkClosed = () => {
      setIsClosed(Date.now() >= REGISTRATION_CLOSE_TIME);
    };
    checkClosed();
    const timer = setInterval(checkClosed, 1000);
    return () => clearInterval(timer);
  }, []);

  const defaultHref = variant === "hero" ? `/registration?event=${slug}` : `/events/${slug}`;
  const targetHref = href || defaultHref;
  const isQuotaFull = propIsQuotaFull || status === "Closed";

  // Kondisi 1: Tepat jam 00:00 WIB pendaftaran ditutup (sesuai instruksi user)
  if (isClosed) {
    if (variant === "hero") {
      return (
        <div className={cn("w-full sm:w-auto block cursor-not-allowed", className)}>
          <Button
            disabled
            size="lg"
            variant="ghost"
            className="w-full sm:w-72 border border-red-500/40 bg-red-500/15 text-red-300 cursor-not-allowed shadow-[0_0_20px_rgba(239,68,68,0.2)] whitespace-nowrap select-none disabled:opacity-95 disabled:pointer-events-none hover:border-red-500/40 hover:text-red-300 py-3.5"
          >
            <span className="text-red-300 font-bold tracking-wider text-sm sm:text-base [text-shadow:0_0_10px_rgba(248,113,113,0.85),0_0_20px_rgba(239,68,68,0.45)]">
              Pendaftaran Telah Ditutup
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
            "w-full text-xs sm:text-sm font-semibold border border-red-500/40 bg-red-500/15 text-red-300 cursor-not-allowed shadow-[0_0_15px_rgba(239,68,68,0.2)] select-none disabled:opacity-95 disabled:pointer-events-none hover:border-red-500/40 hover:text-red-300 group-hover:border-red-500/40 group-hover:text-red-300 py-2.5",
            className
          )}
        >
          <span className="text-red-300 font-bold tracking-wider text-xs sm:text-sm [text-shadow:0_0_8px_rgba(248,113,113,0.85),0_0_18px_rgba(239,68,68,0.45)]">
            Pendaftaran Telah Ditutup
          </span>
        </Button>
      </div>
    );
  }

  // Kondisi 2: Kuota Habis (sebelum jam 00:00 jika status = Closed)
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

  // Kondisi 3: Pendaftaran Masih Dibuka (sebelum jam 00:00 WIB)
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
