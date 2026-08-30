import { GlassCard } from "@/components/ui/GlassCard";
import { MonitorPlay, Trophy, Globe, Zap, Network, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function AboutSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      {/* Visual Kiri: Orbit Animasi 3D */}
      <div className="relative w-full aspect-square max-w-md mx-auto lg:mx-0 flex items-center justify-center mt-10 lg:mt-0">
        {/* Glow Background */}
        <div className="absolute inset-0 rounded-full bg-brand-primary/20 blur-[80px] mix-blend-screen animate-pulse-glow" />
        
        {/* Central Core */}
        <div className="relative z-10 w-40 h-40 rounded-full border border-white/30 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] group transition-all duration-500 hover:scale-110 cursor-pointer p-4">
          <div className="absolute inset-0 rounded-full bg-brand-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Image 
            src="/logo-sifest.png"
            alt="SI FEST Logo"
            width={120}
            height={120}
            className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-500"
          />
        </div>

        {/* Orbit Ring 1 (Inner) */}
        <div className="absolute inset-8 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
        
        {/* Orbit Ring 2 (Outer) */}
        <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse]">
          {/* Orbiting Icons */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] text-blue-400 group hover:scale-125 transition-transform duration-300">
            <MonitorPlay size={24} className="animate-[spin_20s_linear_infinite]" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(245,183,22,0.3)] text-brand-accent group hover:scale-125 transition-transform duration-300">
            <Trophy size={24} className="animate-[spin_20s_linear_infinite]" />
          </div>
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] text-emerald-400 group hover:scale-125 transition-transform duration-300">
            <Globe size={24} className="animate-[spin_20s_linear_infinite]" />
          </div>
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] text-purple-400 group hover:scale-125 transition-transform duration-300">
            <Zap size={24} className="animate-[spin_20s_linear_infinite]" />
          </div>
        </div>
      </div>

      {/* Teks & Kartu Kanan: Staggered Glass Cards */}
      <div className="space-y-6 lg:pl-10 relative">
        {/* Decorative line connecting cards */}
        <div className="hidden lg:block absolute left-4 top-10 bottom-10 w-[2px] bg-gradient-to-b from-brand-accent via-white/20 to-transparent" />

        <div className="relative group transform transition-all duration-500 hover:-translate-y-2 hover:translate-x-2">
          {/* Glowing dot on the line */}
          <div className="hidden lg:block absolute -left-[30px] top-8 w-4 h-4 rounded-full bg-brand-accent shadow-[0_0_15px_rgba(245,183,22,0.8)] transition-all duration-500 group-hover:scale-150" />
          
          <GlassCard variant="medium" className="relative overflow-hidden border-white/10 hover:border-brand-accent/50 p-6 md:p-8 transition-colors duration-500">
            {/* Spotlight effect using CSS radial gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex items-start gap-4 sm:gap-6">
              <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-white shrink-0 group-hover:bg-brand-accent/20 group-hover:text-brand-accent transition-all duration-300 group-hover:scale-110 shadow-lg">
                <Network size={28} className="sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors duration-300">Program Kerja Baru HMJ SI</h3>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base md:text-lg">
                  SI FEST (Sistem Informasi Festival) merupakan terobosan dan <strong className="text-brand-accent font-semibold">program kerja baru</strong> persembahan Himpunan Mahasiswa Jurusan Sistem Informasi Universitas Putra Indonesia &quot;YPTK&quot; Padang.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="relative group transform transition-all duration-500 hover:-translate-y-2 hover:translate-x-2">
          {/* Glowing dot on the line */}
          <div className="hidden lg:block absolute -left-[30px] top-8 w-4 h-4 rounded-full bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-500 group-hover:bg-blue-400 group-hover:shadow-[0_0_15px_rgba(96,165,250,0.8)] group-hover:scale-150" />
          
          <GlassCard variant="medium" className="relative overflow-hidden border-white/10 hover:border-blue-500/50 p-6 md:p-8 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex items-start gap-4 sm:gap-6">
              <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-white shrink-0 group-hover:bg-blue-400/20 group-hover:text-blue-400 transition-all duration-300 group-hover:scale-110 shadow-lg">
                <Users size={28} className="sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">Menyatukan Beragam Potensi</h3>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base md:text-lg">
                  Wadah inovatif bagi minat, bakat, dan kreativitas talenta digital masa depan dalam bidang teknologi, olahraga kompetitif, e-sport, serta panggung kreativitas keagamaan.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* CTA Button to About Page */}
        <div className="pt-6 lg:pt-8 flex justify-start pl-4 md:pl-0">
          <Link href="/about" className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-brand-accent/50 rounded-xl overflow-hidden hover:bg-brand-accent/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,183,22,0.3)]">
            {/* Hover shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
            
            <span className="font-heading font-bold text-white tracking-wider group-hover/btn:text-brand-accent transition-colors duration-300">
              KENALI SI FEST LEBIH JAUH
            </span>
            <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center group-hover/btn:bg-brand-accent group-hover/btn:text-white text-brand-accent transition-all duration-300 group-hover/btn:translate-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
}
