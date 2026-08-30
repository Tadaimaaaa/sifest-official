"use client";

import { Badge } from "@/components/ui/Badge";
import React, { useEffect, useState } from "react";

export function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
    const target = new Date(targetDate).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isMounted) {
    // Initial server render to prevent hydration mismatch
    return (
      <Badge variant="glass" className="animate-float mb-6 inline-flex px-6 py-3">
        <span className="font-medium tracking-widest text-white/90">02—06 NOVEMBER 2026</span>
      </Badge>
    );
  }

  return (
    <Badge variant="glass" className="animate-float mb-6 inline-flex items-center gap-4 px-6 py-3 shadow-[0_0_30px_rgba(245,183,22,0.15)] border-brand-accent/30">
      <div className="flex flex-col items-center min-w-[40px]">
        <span className="text-2xl font-bold font-heading text-brand-accent leading-none text-glow">{timeLeft.days}</span>
        <span className="text-[10px] font-medium uppercase text-white/60 mt-1 tracking-wider">Days</span>
      </div>
      <span className="text-white/20 text-2xl font-light pb-4">:</span>
      <div className="flex flex-col items-center min-w-[40px]">
        <span className="text-2xl font-bold font-heading text-brand-accent leading-none text-glow">{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span className="text-[10px] font-medium uppercase text-white/60 mt-1 tracking-wider">Hours</span>
      </div>
      <span className="text-white/20 text-2xl font-light pb-4">:</span>
      <div className="flex flex-col items-center min-w-[40px]">
        <span className="text-2xl font-bold font-heading text-brand-accent leading-none text-glow">{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span className="text-[10px] font-medium uppercase text-white/60 mt-1 tracking-wider">Mins</span>
      </div>
      <span className="text-white/20 text-2xl font-light pb-4">:</span>
      <div className="flex flex-col items-center min-w-[40px]">
        <span className="text-2xl font-bold font-heading text-brand-accent leading-none text-glow">{timeLeft.seconds.toString().padStart(2, '0')}</span>
        <span className="text-[10px] font-medium uppercase text-white/60 mt-1 tracking-wider">Secs</span>
      </div>
    </Badge>
  );
}
