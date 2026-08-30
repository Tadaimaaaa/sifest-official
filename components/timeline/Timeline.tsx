import { GlassCard } from "@/components/ui/GlassCard";
import React from "react";

export function Timeline() {
  return (
    <div className="mx-auto max-w-4xl">
      <GlassCard variant="medium" className="relative overflow-hidden p-8 md:p-12 text-center">
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-brand-primary/20 blur-3xl"></div>
        <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-brand-accent/20 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="text-brand-accent font-semibold tracking-widest uppercase">Save the Date</div>
          <div className="font-heading text-5xl md:text-6xl text-white text-glow">02 – 06 Nov 2026</div>
          <div className="text-xl text-white/80 max-w-lg">
            Universitas Putra Indonesia &quot;YPTK&quot; Padang
          </div>
          
          <div className="mt-8 w-full border-t border-white/20 pt-8">
            <p className="text-white/60 italic">Detail jadwal harian akan segera diumumkan.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
