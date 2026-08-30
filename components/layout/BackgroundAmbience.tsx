import { Cloud } from "@/components/ui/Cloud";
import { Sparkle } from "@/components/ui/Sparkle";

export function BackgroundAmbience() {
  return (
    <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden h-full">
      
      {/* =========================================
          SECTION 1: HERO (0% - 20%)
          ========================================= */}
      {/* Hero Clouds */}
      <div className="absolute left-[5%] top-[2%] opacity-60">
        <Cloud opacity="medium" />
      </div>
      <div className="absolute right-[5%] top-[5%] scale-125 md:scale-150 opacity-40">
        <Cloud opacity="light" animate={false} blur={false} />
      </div>
      <div className="absolute top-[12%] left-[15%] scale-75 opacity-70">
        <Cloud opacity="heavy" />
      </div>
      {/* Hero Sparkles */}
      <Sparkle className="absolute top-[3%] left-[25%] text-white/50 animate-pulse" size={24} />
      <Sparkle className="absolute top-[10%] right-[30%] text-brand-accent/50 animate-pulse" size={16} />


      {/* =========================================
          SECTION 2: EVENTS (20% - 40%)
          ========================================= */}
      {/* Huge Glowing Orb for Events */}
      <div className="absolute top-[25%] left-[-10%] w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full bg-brand-primary/20 blur-[100px] md:blur-[150px] mix-blend-screen animate-pulse-glow" />
      {/* Subtle grid or sparkles */}
      <Sparkle className="absolute top-[28%] right-[20%] text-white/40 animate-pulse" size={32} />
      <div className="absolute right-[10%] top-[35%] opacity-50">
        <Cloud opacity="medium" />
      </div>


      {/* =========================================
          SECTION 3: ABOUT (40% - 60%)
          ========================================= */}
      {/* Orbiting Halos for About Section */}
      <div className="absolute top-[45%] right-[10%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-white/10 opacity-50 shadow-[0_0_50px_rgba(255,255,255,0.05)] animate-spin-slow" />
      <div className="absolute top-[45%] right-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-white/5 opacity-30 shadow-[0_0_50px_rgba(255,255,255,0.05)] animate-spin-slow-reverse" />
      
      <Sparkle className="absolute top-[55%] left-[15%] text-brand-accent/40 animate-pulse" size={28} />


      {/* =========================================
          SECTION 4: TIMELINE (60% - 80%)
          ========================================= */}
      {/* Ambient Clouds for Timeline */}
      <div className="absolute left-[5%] top-[65%] scale-125 opacity-30">
        <Cloud opacity="light" animate={false} />
      </div>
      <div className="absolute right-[15%] top-[72%] scale-75 opacity-60">
        <Cloud opacity="heavy" />
      </div>
      {/* Glowing Orb */}
      <div className="absolute top-[70%] right-[-5%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-[#a1c4fd]/10 blur-[100px] md:blur-[120px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: '2s' }} />


      {/* =========================================
          SECTION 5: REGISTRATION & SPONSORS (80% - 100%)
          ========================================= */}
      <Sparkle className="absolute top-[85%] left-[20%] text-white/50 animate-pulse" size={24} />
      <div className="absolute left-[40%] top-[95%] opacity-40">
        <Cloud opacity="medium" />
      </div>
      <Sparkle className="absolute top-[92%] right-[25%] text-brand-accent/60 animate-pulse" size={18} />

    </div>
  );
}
