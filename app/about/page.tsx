import { BackgroundAmbience } from "@/components/layout/BackgroundAmbience";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/navigation/Navbar";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { CommitteeGrid } from "@/components/about/CommitteeGrid";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Mengenal SI FEST - Sejarah & Kepanitiaan",
  description: "Pelajari lebih jauh tentang SI FEST, visi dan misi kami, serta orang-orang hebat di balik layar acara ini.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#050a15]">
      <BackgroundAmbience />
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-brand-accent font-semibold tracking-widest uppercase text-sm">Di Balik Layar</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50 mb-6 drop-shadow-sm leading-tight">
            Mengenal Lebih Jauh <br className="hidden md:block"/> SI FEST 2026
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            SI FEST (Sistem Informasi Festival) adalah <strong className="text-white">program kerja terbaru</strong> dari Himpunan Mahasiswa Jurusan Sistem Informasi. Sebuah terobosan inovatif untuk menyatukan ribuan talenta digital muda dalam satu perayaan teknologi terbesar.
          </p>
        </div>
      </div>

      {/* Visi Misi Section */}
      <Section id="vision" className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          <GlassCard variant="medium" className="p-8 md:p-12 border-brand-accent/20 hover:border-brand-accent/50 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-brand-accent/20 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
            </div>
            <h3 className="text-3xl font-heading font-bold text-white mb-4">Visi Kami</h3>
            <p className="text-white/70 leading-relaxed text-lg">
              Menjadi wadah utama yang menginspirasi, menghubungkan, dan mendorong inovasi mahasiswa Sistem Informasi serta generasi muda di bidang teknologi dan industri kreatif tingkat nasional.
            </p>
          </GlassCard>

          <GlassCard variant="medium" className="p-8 md:p-12 border-blue-500/20 hover:border-blue-500/50 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
            </div>
            <h3 className="text-3xl font-heading font-bold text-white mb-4">Misi Kami</h3>
            <ul className="text-white/70 leading-relaxed text-lg space-y-3 list-none">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✦</span>
                Mengadakan kompetisi yang memacu kolaborasi kreatif.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✦</span>
                Menyediakan seminar dari pakar industri teknologi terkini.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✦</span>
                Membangun jaringan solidaritas antar mahasiswa dan praktisi.
              </li>
            </ul>
          </GlassCard>
        </div>
      </Section>

      {/* Committee Section */}
      <Section id="committee" title="TIM PANITIA" subtitle="Merekalah penggerak utama di balik kesuksesan SI FEST 2026.">
        <CommitteeGrid />
      </Section>

      <Footer />
    </main>
  );
}
