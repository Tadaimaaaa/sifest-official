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
              Sinergi Inovasi: Menautkan Teknologi, Merangkul Keberagaman.
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
            <div className="flex gap-4 items-center">
              <a href="https://www.instagram.com/sifest.hmjsi?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors border border-white/10 hover:border-brand-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@hmjsi_upiyptk?_r=1&_t=ZS-99cMlonPOWj" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors border border-white/10 hover:border-brand-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-.9 4.45-2.43 5.92-1.11 1.05-2.58 1.72-4.14 1.89-1.58.19-3.21.05-4.66-.56-2.15-.9-3.79-2.73-4.32-4.96-.54-2.22-.05-4.64 1.25-6.46 1.09-1.54 2.71-2.58 4.54-3.04 1.4-.33 2.87-.31 4.25-.03v4.21c-.81-.31-1.74-.35-2.61-.17-1.11.23-2.07 1.01-2.48 2.06-.41 1.03-.3 2.24.28 3.16.59.95 1.63 1.57 2.73 1.65 1.15.09 2.33-.21 3.19-1.01.88-.8 1.34-1.99 1.38-3.18.06-4.93.03-9.87.03-14.8z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@hmj-si?si=iaZKPTCdCbczL4j0" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors border border-white/10 hover:border-brand-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>&copy; 2026 HMJ Sistem Informasi UPI YPTK Padang. Hak Cipta Dilindungi.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <p>Developed by Tadaimaaaa</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
