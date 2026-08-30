import { EventGrid } from "@/components/events/EventGrid";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/navigation/Navbar";
import { Section } from "@/components/layout/Section";
import { BackgroundAmbience } from "@/components/layout/BackgroundAmbience";
import { getAllEvents } from "@/lib/events";
import React from "react";
import { Container } from "@/components/ui/Container";
import { Sparkle } from "@/components/ui/Sparkle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Eksplorasi seluruh kegiatan dan acara di SI FEST 2026. Temukan kompetisi dan seminar yang sesuai dengan minat Anda.",
};

export default function EventsIndexPage() {
  const events = getAllEvents();

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#0A192F]/40">
      <BackgroundAmbience />
      <Navbar />

      {/* Custom Compact Event Hero */}
      <section className="relative w-full pt-32 md:pt-40 pb-16 block">
        <Container className="relative z-10 block w-full text-center">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-[var(--radius-pill)] glass-strong border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-6 mx-auto w-auto max-w-[95%]">
              <Sparkle size={16} className="text-brand-accent animate-pulse-glow hidden sm:block" />
              <span className="text-sm font-bold tracking-[0.15em] text-white uppercase text-glow text-center">
                EXPLORE SI FEST
              </span>
              <Sparkle size={16} className="text-brand-accent animate-pulse-glow hidden sm:block" />
            </div>
            
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 text-glow">
              SI FEST 2026
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed block w-full mb-8">
              <span className="font-semibold text-brand-accent/90">26 – 30 Oktober 2026</span>
              <br />
              Universitas Putra Indonesia &quot;YPTK&quot; Padang
            </p>
          </div>
        </Container>
      </section>

      {/* Event Grid Section */}
      <Section id="events-list" className="pt-0 pb-32">
        <EventGrid events={events} />
      </Section>

      <Footer />
    </main>
  );
}
