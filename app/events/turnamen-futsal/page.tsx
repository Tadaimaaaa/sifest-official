import { getEventBySlug } from "@/lib/events";
import { EventGrid } from "@/components/events/EventGrid";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/navigation/Navbar";
import { BackgroundAmbience } from "@/components/layout/BackgroundAmbience";
import { Container } from "@/components/ui/Container";
import { Sparkle } from "@/components/ui/Sparkle";
import { notFound } from "next/navigation";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pilih Kategori Futsal",
  description: "Pilih kategori Turnamen Futsal yang ingin Anda ikuti: Tingkat SLTA atau UMUM.",
};

export default function FutsalCategoryPage() {
  const sltaEvent = getEventBySlug("turnamen-futsal-slta");
  const umumEvent = getEventBySlug("turnamen-futsal-umum");

  if (!sltaEvent || !umumEvent) {
    notFound();
  }

  const futsalEvents = [sltaEvent, umumEvent];

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#0A192F]/40 flex flex-col">
      <BackgroundAmbience />
      <Navbar />

      <section className="relative w-full pt-32 md:pt-40 pb-20 flex-grow">
        <Container className="relative z-10 block w-full text-center mb-16">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-[var(--radius-pill)] glass-strong border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-6 mx-auto w-auto max-w-[95%]">
              <Sparkle size={16} className="text-brand-accent animate-pulse-glow hidden sm:block" />
              <span className="text-sm font-bold tracking-[0.15em] text-white uppercase text-glow text-center">
                TURNAMEN FUTSAL
              </span>
              <Sparkle size={16} className="text-brand-accent animate-pulse-glow hidden sm:block" />
            </div>
            
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 text-glow">
              Pilih Kategori Futsal
            </h1>
            <p className="text-lg text-white/70">
              Turnamen Futsal SI FEST 2026 dibagi menjadi dua kategori perlombaan. Silakan pilih kategori di bawah ini untuk melihat detail lengkap pendaftaran, biaya, dan persyaratannya.
            </p>
          </div>
        </Container>

        <Container className="relative z-10">
          <EventGrid events={futsalEvents} />
        </Container>
      </section>

      <Footer />
    </main>
  );
}
