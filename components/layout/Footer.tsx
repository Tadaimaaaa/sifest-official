import { Container } from "@/components/ui/Container";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0A192F]/80 backdrop-blur-xl pt-16 pb-8 z-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-bold text-white text-glow">SI FEST 2026</span>
            </Link>
            <p className="text-white/70 max-w-sm mb-6">
              Sinergi Inovasi: Menyatukan Teknologi, Merangkul Keberagaman.
              Situs Web Resmi Sistem Informasi Festival.
            </p>
            <p className="text-white/50 text-sm">
              HMJ Sistem Informasi<br />
              Universitas Putra Indonesia &quot;YPTK&quot; Padang
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Navigasi</h4>
            <ul className="space-y-2">
              <li><Link href="#events" className="text-white/60 hover:text-white transition-colors">Acara</Link></li>
              <li><Link href="#timeline" className="text-white/60 hover:text-white transition-colors">Jadwal</Link></li>
              <li><Link href="/registration" className="text-white/60 hover:text-white transition-colors">Pendaftaran</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Hubungi Kami</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Instagram @SIFEST_HMJSI</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">TikTok @HMJSI_UPIYPTK</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">YouTube HMJ SI</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>&copy; 2026 HMJ Sistem Informasi UPI YPTK Padang. Hak Cipta Dilindungi.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white/80">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white/80">Syarat & Ketentuan</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
