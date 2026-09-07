"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function RegistrationCountdown({ 
  startDate, 
  closeDate,
  phases
}: { 
  startDate?: string; 
  closeDate: string;
  phases?: { name: string; startDate: string; endDate: string }[];
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
        // Find current phase
        const currentPhase = phases.find(p => {
          const start = new Date(p.startDate).getTime();
          const end = new Date(p.endDate).getTime();
          return now >= start && now <= end;
        });

        if (currentPhase) {
          newStatus = "open";
          text = `Buka (${currentPhase.name})`;
          targetTime = 0; // No countdown when open
        } else {
          // Find next phase
          const nextPhase = phases.find(p => new Date(p.startDate).getTime() > now);
          if (nextPhase) {
            newStatus = "pending";
            text = "Buka dalam: ";
            targetTime = new Date(nextPhase.startDate).getTime();
          } else {
            newStatus = "closed";
            text = "Pendaftaran Ditutup";
          }
        }
      } else {
        // Fallback to simple start/close logic
        const startTime = startDate ? new Date(startDate).getTime() : 0;
        const closeTime = new Date(closeDate).getTime();

        if (startTime > now) {
          newStatus = "pending";
          text = "Buka dalam: ";
          targetTime = startTime;
        } else if (closeTime > now) {
          newStatus = "open";
          text = "Sisa: ";
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

  if (!mounted) return <span>Sisa Waktu: ...</span>;

  if (status === "closed") {
    return <span>Pendaftaran Ditutup</span>;
  }

  return (
    <span className="flex items-center gap-1.5">
      <Clock size={12} />
      {statusText}
      {timeLeft && (
        <span>
          {timeLeft.d}h {timeLeft.h}j {timeLeft.m}m {timeLeft.s}d
        </span>
      )}
    </span>
  );
}
