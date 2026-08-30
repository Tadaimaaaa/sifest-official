import { BackgroundAmbience } from "@/components/layout/BackgroundAmbience";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/navigation/Navbar";
import { Section } from "@/components/layout/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { CommitteeGrid } from "@/components/about/CommitteeGrid";
import { PhilosophySection } from "@/components/about/PhilosophySection";
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

      {/* Latar Belakang Section */}
      <Section id="history" className="pt-0">
        <GlassCard variant="medium" className="p-8 md:p-12 lg:p-16 max-w-5xl mx-auto border-brand-accent/20 hover:border-brand-accent/50 transition-colors relative overflow-hidden group">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] -z-10 group-hover:bg-brand-accent/20 transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/20 transition-colors duration-500" />
          
          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start relative z-10">
            <div className="md:w-1/3 shrink-0 sticky top-24">
              <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                <span className="text-brand-accent font-semibold tracking-widest uppercase text-sm shadow-sm">Awal Mula</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight">
                Latar Belakang <br className="hidden md:block" /> Terciptanya <br className="hidden lg:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-300">SI FEST</span>
              </h2>
            </div>
            
            <div className="md:w-2/3 space-y-6 text-white/70 leading-relaxed text-base md:text-lg text-justify">
              <p>
                Sebagai salah satu himpunan mahasiswa paling progresif di Universitas Putra Indonesia &quot;YPTK&quot; Padang, <strong className="text-white">Himpunan Mahasiswa Jurusan Sistem Informasi (HMJ SI)</strong> selalu dituntut untuk berinovasi dan memberikan ruang nyata bagi penyaluran minat serta bakat para mahasiswa.
              </p>
              <p>
                Dari keresahan akan perlunya panggung kolaborasi masif yang mampu meleburkan teknologi, semangat kompetitif, dan solidaritas keagamaan, tercetuslah sebuah ide besar untuk menciptakan <strong className="text-brand-accent font-medium">program kerja baru berskala besar</strong> yang belum pernah direalisasikan sebelumnya.
              </p>
              <p>
                Melalui <strong className="text-white">SI FEST (Sistem Informasi Festival) 2026</strong>, kami menembus batasan lama. Acara ini bukan sekadar rentetan perlombaan biasa, melainkan sebuah perayaan kreativitas dan arena pembuktian bagi talenta digital masa depan. SI FEST adalah wujud nyata dedikasi kami dalam mencetak generasi unggul yang siap berdaya saing tinggi.
              </p>
            </div>
          </div>
        </GlassCard>
        
        <PhilosophySection />
      </Section>

      {/* Committee Section */}
      <Section id="committee" title="TIM PANITIA" subtitle="Merekalah penggerak utama di balik kesuksesan SI FEST 2026.">
        <CommitteeGrid />
      </Section>

      <Footer />
    </main>
  );
}
