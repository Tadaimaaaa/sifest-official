import { GlassCard } from "@/components/ui/GlassCard";
import React from "react";

export function Timeline() {
  return (
    <div className="mx-auto max-w-4xl">
      <GlassCard variant="medium" className="relative overflow-hidden p-8 md:p-12 text-center">
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-brand-primary/20 blur-3xl"></div>
        <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-brand-accent/20 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="text-brand-accent font-semibold tracking-widest uppercase text-sm">Save the Date</div>
          
          <div className="my-6 relative group cursor-default">
            {/* 3D Calendar Card */}
            <div className="relative z-10 w-64 md:w-80 rounded-2xl bg-gradient-to-br from-white to-slate-100 p-6 md:p-8 pb-10 text-center transform transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(245,183,22,0.4)] shadow-[0_12px_0_#94a3b8,0_20px_30px_rgba(0,0,0,0.5)] border-2 border-slate-200">
              
              {/* Calendar rings */}
              <div className="absolute -top-5 left-[25%] w-4 h-12 bg-gradient-to-b from-slate-200 to-slate-500 rounded-full shadow-md border-2 border-slate-600 z-20"></div>
              <div className="absolute -top-5 right-[25%] w-4 h-12 bg-gradient-to-b from-slate-200 to-slate-500 rounded-full shadow-md border-2 border-slate-600 z-20"></div>
              
              {/* Header block (Month & Year) */}
              <div className="absolute top-0 left-0 w-full h-14 bg-gradient-to-b from-red-500 to-red-700 rounded-t-xl flex items-center justify-center border-b-2 border-red-800 shadow-inner">
                <span className="text-white font-bold tracking-widest uppercase text-sm mt-2">November 2026</span>
              </div>
              
              {/* Dates */}
              <div className="mt-12 font-heading text-5xl md:text-7xl font-bold text-slate-800 drop-shadow-sm flex items-center justify-center gap-2">
                02<span className="text-red-500/80">-</span>06
              </div>
            </div>
            
            {/* Glowing backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/20 blur-3xl rounded-full -z-10 transition-all duration-500 group-hover:bg-brand-accent/30 group-hover:blur-[40px]"></div>
          </div>
          
          <div className="text-xl text-white/90 max-w-lg mt-4 font-medium drop-shadow-md">
            Universitas Putra Indonesia &quot;YPTK&quot; Padang
          </div>
          
          <div className="mt-6 w-full border-t border-white/10 pt-6">
            <p className="text-white/50 italic text-sm">Detail jadwal harian akan segera diumumkan.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
