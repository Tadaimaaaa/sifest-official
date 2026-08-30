import { EventGrid } from "@/components/events/EventGrid";
import { Hero } from "@/components/hero/Hero";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Navbar } from "@/components/navigation/Navbar";
import { SponsorGrid } from "@/components/sponsors/SponsorGrid";
import { Timeline } from "@/components/timeline/Timeline";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundAmbience } from "@/components/layout/BackgroundAmbience";
import { AboutSection } from "@/components/about/AboutSection";
import { OFFICIAL_EVENTS } from "@/data/events";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden">
      <BackgroundAmbience />
      <Navbar />
      
      <Hero />

      <Section id="events" title="JELAJAHI SI FEST">
        <EventGrid events={OFFICIAL_EVENTS} />
      </Section>

      <Section id="about" title="MENGENAL LEBIH JAUH SI FEST">
        <AboutSection />
      </Section>

      <Section id="timeline">
        <Timeline />
      </Section>

      <Section id="registration" className="py-32 relative overflow-hidden">
        {/* Background glow for CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none" />
        
        <GlassCard variant="strong" className="mx-auto max-w-3xl text-center p-12 border-brand-accent/30 shadow-[0_0_50px_rgba(245,183,22,0.15)]">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white text-glow mb-6">
            SIAP BERGABUNG DENGAN SI FEST?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto">
            Perjalanan Anda dimulai di sini. Daftarkan diri Anda dan jadilah bagian dari festival teknologi terbesar tahun ini.
          </p>
          <Link href="/registration">
            <Button size="lg" variant="primary" className="text-lg px-12 h-16 shadow-lg shadow-brand-accent/25">
              DAFTAR SEKARANG
            </Button>
          </Link>
        </GlassCard>
      </Section>

      <Section id="sponsors" title="Sponsor & Mitra Kami">
        <SponsorGrid />
      </Section>

      <Footer />
    </main>
  );
}
