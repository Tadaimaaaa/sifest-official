import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Sparkle } from "@/components/ui/Sparkle";
import { Countdown } from "./Countdown";
import Link from "next/link";
import React from "react";

export function Hero() {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden pt-32 md:pt-40 pb-24">
      <Container className="relative z-10">
        <div className="mx-auto text-center max-w-4xl">
          <Countdown targetDate="2026-11-02T08:00:00+07:00" />
          
          <h1 className="font-heading text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl text-glow leading-[1.1] mb-6">
            SI FEST <br className="hidden sm:block" />
            <span className="text-brand-accent block sm:inline mt-2 sm:mt-0">2026</span>
          </h1>
          
          <div className="mb-8 w-full">
            <div className="inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 rounded-[var(--radius-pill)] glass-strong border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-6 mx-auto w-auto max-w-[95%]">
              <Sparkle size={16} className="text-brand-accent animate-pulse-glow hidden sm:block" />
              <span className="text-sm sm:text-lg md:text-xl font-bold tracking-[0.1em] sm:tracking-[0.15em] text-white uppercase text-glow text-center">
                Sistem Informasi Festival
              </span>
              <Sparkle size={16} className="text-brand-accent animate-pulse-glow hidden sm:block" />
            </div>
            
            <div className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed text-center space-y-2">
              <p>
                <span className="font-heading text-lg md:text-xl font-medium text-white text-glow animate-pulse-glow">
                  Sinergi Inovasi: Menyatukan Teknologi, Merangkul Keberagaman.
                </span>
              </p>
              <p className="text-white/95 font-medium">
                Himpunan Mahasiswa Jurusan Sistem Informasi
              </p>
              <p className="text-brand-accent/90 font-medium tracking-wide">
                Universitas Putra Indonesia &quot;YPTK&quot; Padang
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mt-8">
            <Link href="#events" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full shadow-lg shadow-brand-accent/20">
                Jelajahi Acara
              </Button>
            </Link>
            <Link href="/registration" className="w-full sm:w-auto">
              <Button size="lg" variant="glass" className="w-full">
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
