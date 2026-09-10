import { EventGrid } from "@/components/events/EventGrid";
import { Hero } from "@/components/hero/Hero";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Navbar } from "@/components/navigation/Navbar";
import { SponsorGrid } from "@/components/sponsors/SponsorGrid";
import { MediaPartnerGrid } from "@/components/sponsors/MediaPartnerGrid";
import { Timeline } from "@/components/timeline/Timeline";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundAmbience } from "@/components/layout/BackgroundAmbience";
import { AboutSection } from "@/components/about/AboutSection";
import { getMainEvents } from "@/lib/events";
import Link from "next/link";
import React from "react";
import { Sparkles, Rocket, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden">
      <BackgroundAmbience />
      <Navbar />
      
      <Hero />

      <Section id="events" title="JELAJAHI SI FEST">
        <EventGrid events={getMainEvents()} />
      </Section>

      <Section id="about" title="MENGENAL LEBIH JAUH SI FEST">
        <AboutSection />
      </Section>

      <Section id="timeline">
        <Timeline />
      </Section>

      <Section id="registration" className="py-32 relative overflow-hidden">
        {/* Background glow and floating elements for CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-gradient-to-tr from-brand-accent/20 to-brand-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
        
        <div className="absolute top-1/4 left-1/4 animate-float opacity-70">
          <Sparkles className="text-brand-accent w-10 h-10" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-float-slow opacity-50 delay-700">
          <Rocket className="text-blue-400 w-12 h-12" />
        </div>

        <GlassCard variant="strong" className="mx-auto max-w-4xl text-center p-12 md:p-16 border-white/20 shadow-[0_0_80px_rgba(245,183,22,0.15)] relative overflow-hidden group">
          {/* Inner animated border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[marquee_2s_linear_infinite] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-brand-accent text-sm font-semibold mb-8 backdrop-blur-md shadow-lg">
              <Sparkles size={16} />
              <span>Tiket Resmi SI FEST 2026</span>
            </div>
            
            <h2 className="font-heading text-4xl md:text-6xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-accent to-white animate-gradient-x drop-shadow-[0_2px_20px_rgba(245,183,22,0.4)]">
              SIAP BERGABUNG DENGAN SI FEST?
            </h2>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Perjalanan Anda dimulai di sini. Daftarkan diri Anda dan jadilah bagian dari <strong className="text-white font-semibold">festival teknologi terbesar</strong> tahun ini.
            </p>
            
            <Link href="/registration" className="relative group/btn">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-yellow-400 rounded-full blur opacity-70 group-hover/btn:opacity-100 transition duration-500 group-hover/btn:duration-200"></div>
              <Button size="lg" className="relative text-lg px-12 h-16 bg-gradient-to-r from-brand-accent to-yellow-500 hover:from-yellow-400 hover:to-brand-accent text-slate-900 font-bold border-none shadow-xl flex items-center gap-3 rounded-full transition-all group-hover/btn:scale-105">
                DAFTAR SEKARANG
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </GlassCard>
      </Section>

      <Section id="sponsors" title="Sponsor & Mitra Kami">
        <SponsorGrid />
      </Section>

      <Section id="media-partners" title="Media Partner" className="pt-0">
        <MediaPartnerGrid />
      </Section>

      <Footer />
    </main>
  );
}
