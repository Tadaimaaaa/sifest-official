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
          
          <div className="my-12 w-full max-w-2xl relative group cursor-default" style={{ perspective: "2000px" }}>
            {/* 3D Calendar Card */}
            <div 
              className="relative z-10 w-full rounded-3xl bg-gradient-to-br from-white to-slate-100 p-4 md:p-8 pb-10 text-center transition-all duration-700 border-2 border-slate-200 group-hover:scale-[1.02]"
              style={{ 
                transform: "rotateX(30deg) rotateY(-15deg) rotateZ(5deg)",
                transformStyle: "preserve-3d",
                boxShadow: "-15px 25px 0px #cbd5e1, -25px 40px 40px rgba(0,0,0,0.4)"
              }}
            >
              
              {/* Calendar rings */}
              <div className="absolute -top-6 left-[15%] w-5 h-14 bg-gradient-to-b from-slate-200 to-slate-500 rounded-full shadow-lg border-2 border-slate-600" style={{ transform: "translateZ(20px)" }}></div>
              <div className="absolute -top-6 left-[35%] w-5 h-14 bg-gradient-to-b from-slate-200 to-slate-500 rounded-full shadow-lg border-2 border-slate-600" style={{ transform: "translateZ(20px)" }}></div>
              <div className="absolute -top-6 right-[35%] w-5 h-14 bg-gradient-to-b from-slate-200 to-slate-500 rounded-full shadow-lg border-2 border-slate-600" style={{ transform: "translateZ(20px)" }}></div>
              <div className="absolute -top-6 right-[15%] w-5 h-14 bg-gradient-to-b from-slate-200 to-slate-500 rounded-full shadow-lg border-2 border-slate-600" style={{ transform: "translateZ(20px)" }}></div>
              
              {/* Header block (Month & Year) */}
              <div className="absolute top-0 left-0 w-full h-16 md:h-20 bg-gradient-to-b from-red-600 to-red-800 rounded-t-3xl flex items-center justify-center border-b-4 border-red-900 shadow-inner" style={{ transform: "translateZ(5px)" }}>
                <span className="text-white font-bold tracking-widest uppercase text-xl md:text-2xl mt-2 drop-shadow-md">November 2026</span>
              </div>
              
              {/* Grid */}
              <div className="mt-16 md:mt-20 pt-4" style={{ transformStyle: "preserve-3d" }}>
                <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4 text-slate-500 font-bold text-xs md:text-base uppercase" style={{ transform: "translateZ(10px)" }}>
                  <div>Min</div><div>Sen</div><div>Sel</div><div>Rab</div><div>Kam</div><div>Jum</div><div>Sab</div>
                </div>
                <div className="grid grid-cols-7 gap-2 md:gap-4 text-slate-800 font-semibold text-lg md:text-2xl" style={{ transformStyle: "preserve-3d" }}>
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const isEventDay = day >= 2 && day <= 6;
                    
                    return (
                      <div 
                        key={day}
                        className={`aspect-square flex items-center justify-center rounded-lg md:rounded-xl transition-all duration-300 ${
                          isEventDay 
                            ? "bg-gradient-to-br from-brand-accent to-[#e69b00] text-white shadow-[-6px_8px_0px_#996700,-10px_15px_20px_rgba(0,0,0,0.5)] border border-[#ffcd4d] z-20 group-hover:scale-110"
                            : "bg-white border border-slate-200 shadow-sm"
                        }`}
                        style={{
                          transform: isEventDay ? "translateZ(40px) translateX(-5px) translateY(-5px)" : "translateZ(10px)",
                        }}
                      >
                        {day}
                      </div>
                    );
                  })}
                  {/* Empty cells for padding end of month (Nov 2026 ends on Monday, so no trailing cells needed if starting Sunday, wait: Nov 1 is Sunday. So it takes 30 cells. 30 cells = 4 rows + 2 cells. We can leave it as is, grid will auto-wrap) */}
                  <div className="aspect-square bg-transparent"></div>
                  <div className="aspect-square bg-transparent"></div>
                  <div className="aspect-square bg-transparent"></div>
                  <div className="aspect-square bg-transparent"></div>
                  <div className="aspect-square bg-transparent"></div>
                </div>
              </div>
            </div>
            
            {/* Glowing backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/20 blur-3xl rounded-full -z-20 transition-all duration-500 group-hover:bg-brand-accent/30 group-hover:blur-[40px]"></div>
          </div>
          
          <div className="text-xl text-white/90 max-w-lg mt-8 font-medium drop-shadow-md text-center">
            Universitas Putra Indonesia &quot;YPTK&quot; Padang
          </div>
          
          <div className="mt-4 w-full border-t border-white/10 pt-6 text-center">
            <p className="text-white/50 italic text-sm">Detail jadwal harian akan segera diumumkan.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
