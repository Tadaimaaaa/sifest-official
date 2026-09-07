"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function RegistrationCountdown({ startDate, closeDate }: { startDate?: string; closeDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const [status, setStatus] = useState<"pending" | "open" | "closed">("open");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const startTime = startDate ? new Date(startDate).getTime() : 0;
      const closeTime = new Date(closeDate).getTime();

      if (startTime > now) {
        // Registration hasn't started yet
        setStatus("pending");
        const diff = startTime - now;
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      } else if (closeTime > now) {
        // Registration is open
        setStatus("open");
        const diff = closeTime - now;
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      } else {
        // Registration is closed
        setStatus("closed");
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [startDate, closeDate]);

  if (!mounted) return <span>Sisa Waktu: ...</span>;

  if (status === "closed") {
    return <span>Pendaftaran Ditutup</span>;
  }

  return (
    <span className="flex items-center gap-1.5">
      <Clock size={12} />
      {status === "pending" ? "Buka dalam: " : "Sisa: "}
      {timeLeft?.d}h {timeLeft?.h}j {timeLeft?.m}m {timeLeft?.s}d
    </span>
  );
}
