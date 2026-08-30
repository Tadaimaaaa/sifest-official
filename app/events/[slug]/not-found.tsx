import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BackgroundAmbience } from "@/components/layout/BackgroundAmbience";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden">
      <BackgroundAmbience />
      <Navbar />
      
      <section className="relative flex min-h-[80svh] items-center justify-center pt-24">
        <Container className="relative z-10 text-center max-w-2xl">
          <div className="inline-flex items-center justify-center px-6 py-2 rounded-full glass-strong border-white/20 mb-6">
            <span className="text-sm font-bold tracking-widest text-status-warning uppercase">
              404 - NOT FOUND
            </span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 text-glow">
            EVENT TIDAK DITEMUKAN
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
            Maaf, acara yang Anda cari tidak tersedia atau mungkin telah dihapus. Silakan jelajahi daftar acara resmi kami lainnya.
          </p>
          
          <Link href="/events">
            <Button size="lg" variant="primary" className="shadow-lg shadow-brand-accent/20">
              Jelajahi Acara
            </Button>
          </Link>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
