import { GlassCard } from "@/components/ui/GlassCard";
import { Trophy, Gamepad2, Sparkles, BookOpen, Rocket } from "lucide-react";
import React from "react";

export function Timeline() {
  return (
    <div className="mx-auto max-w-4xl">
      <GlassCard variant="medium" className="relative overflow-hidden p-8 md:p-12 text-center">
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-brand-primary/20 blur-3xl"></div>
        <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-brand-accent/20 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* Massive Glowing Headline */}
          <div className="flex flex-col items-center mb-4 md:mb-8 relative">
            <h2 className="text-5xl md:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-accent via-yellow-300 to-[#ff9900] drop-shadow-[0_0_30px_rgba(245,183,22,0.6)] animate-pulse tracking-wider">
              SAVE THE DATE
            </h2>
            <div className="flex items-center gap-4 mt-4 text-white/80">
              <div className="h-[2px] w-12 md:w-24 bg-gradient-to-r from-transparent to-brand-accent/70 rounded-full"></div>
              <span className="tracking-[0.4em] uppercase text-xs md:text-sm font-bold text-brand-accent/90">SI FEST 2026</span>
              <div className="h-[2px] w-12 md:w-24 bg-gradient-to-l from-transparent to-brand-accent/70 rounded-full"></div>
            </div>
          </div>
          
          <div className="my-16 w-full max-w-lg relative group cursor-default" style={{ perspective: "2000px" }}>
            {/* Floating Animated Elements */}
            <div className="absolute -left-12 md:-left-20 top-10 animate-bounce text-brand-accent drop-shadow-[0_0_15px_rgba(245,183,22,0.5)] z-20" style={{ animationDelay: '0.2s', animationDuration: '3s' }}>
              <Trophy size={48} className="opacity-80 transform -rotate-12" />
            </div>
            <div className="absolute -right-8 md:-right-16 top-32 animate-bounce text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)] z-20" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}>
              <Gamepad2 size={56} className="opacity-80 transform rotate-12" />
            </div>
            <div className="absolute -left-4 md:-left-12 bottom-16 animate-bounce text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.5)] z-20" style={{ animationDelay: '0.1s', animationDuration: '4s' }}>
              <BookOpen size={42} className="opacity-80 transform -rotate-6" />
            </div>
            <div className="absolute right-4 md:-right-4 -top-8 animate-bounce text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)] z-20" style={{ animationDelay: '0.7s', animationDuration: '2.5s' }}>
              <Sparkles size={36} className="opacity-90 transform rotate-45" />
            </div>
            <div className="absolute left-1/3 -bottom-14 animate-bounce text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)] z-20" style={{ animationDelay: '0.4s', animationDuration: '3.2s' }}>
              <Rocket size={44} className="opacity-80 transform rotate-12" />
            </div>

            {/* 3D Calendar Card */}
            <div 
              className="relative z-10 w-full rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-4 sm:p-6 pb-8 text-center transition-all duration-700 border border-white/20 group-hover:scale-[1.05] group-hover:rotate-y-[-5deg]"
              style={{ 
                transform: "rotateX(25deg) rotateY(-10deg) rotateZ(3deg)",
                transformStyle: "preserve-3d",
                boxShadow: "-10px 20px 0px rgba(255,255,255,0.05), -20px 30px 40px rgba(0,0,0,0.5)"
              }}
            >
              
              {/* Calendar rings */}
              <div className="absolute -top-6 left-[15%] w-5 h-14 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full shadow-lg border border-white/20" style={{ transform: "translateZ(20px)" }}></div>
              <div className="absolute -top-6 left-[35%] w-5 h-14 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full shadow-lg border border-white/20" style={{ transform: "translateZ(20px)" }}></div>
              <div className="absolute -top-6 right-[35%] w-5 h-14 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full shadow-lg border border-white/20" style={{ transform: "translateZ(20px)" }}></div>
              <div className="absolute -top-6 right-[15%] w-5 h-14 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full shadow-lg border border-white/20" style={{ transform: "translateZ(20px)" }}></div>
              
              {/* Header block (Month & Year) */}
              <div className="absolute top-0 left-0 w-full h-14 sm:h-16 bg-brand-primary/40 rounded-t-3xl flex items-center justify-center border-b border-white/10 shadow-inner" style={{ transform: "translateZ(5px)" }}>
                <span className="text-white font-bold tracking-widest uppercase text-lg sm:text-xl mt-2 drop-shadow-md">November 2026</span>
              </div>
              
              {/* Grid */}
              <div className="mt-14 sm:mt-16 pt-4" style={{ transformStyle: "preserve-3d" }}>
                <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 text-white/50 font-bold text-[10px] sm:text-xs md:text-sm uppercase" style={{ transform: "translateZ(10px)" }}>
                  <div>Min</div><div>Sen</div><div>Sel</div><div>Rab</div><div>Kam</div><div>Jum</div><div>Sab</div>
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-white/90 font-semibold text-sm sm:text-base md:text-lg" style={{ transformStyle: "preserve-3d" }}>
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const isEventDay = day >= 2 && day <= 6;
                    
                    return (
                      <div 
                        key={day}
                        className={`aspect-square flex items-center justify-center rounded-lg md:rounded-xl transition-all duration-300 ${
                          isEventDay 
                            ? "bg-gradient-to-br from-brand-accent to-[#e69b00] text-white shadow-[-6px_8px_0px_#996700,-10px_15px_20px_rgba(0,0,0,0.5)] border border-[#ffcd4d] z-20 group-hover:scale-110"
                            : "bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-white/10"
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
