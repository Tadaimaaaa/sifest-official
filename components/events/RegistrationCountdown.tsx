"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function RegistrationCountdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
          s: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return <span>Sisa Waktu: ...</span>;

  if (!timeLeft) {
    return <span>Pendaftaran Ditutup</span>;
  }

  return (
    <span className="flex items-center gap-1.5">
      <Clock size={12} />
      Sisa: {timeLeft.d}h {timeLeft.h}j {timeLeft.m}m {timeLeft.s}d
    </span>
  );
}
