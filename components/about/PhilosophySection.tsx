import { GlassCard } from "@/components/ui/GlassCard";
import React from "react";
import Image from "next/image";

export function PhilosophySection() {
  return (
    <div className="max-w-7xl mx-auto mt-16 md:mt-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Makna & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-300">Filosofi</span>
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Setiap bentuk dan warna dalam identitas visual SI FEST dirancang dengan pesan mendalam yang merepresentasikan semangat teknologi dan kolaborasi.
        </p>
      </div>

      {/* Main Philosophy Card */}
      <GlassCard variant="medium" className="p-8 md:p-12 relative overflow-hidden border-white/10">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Logo Display */}
        <div className="flex justify-center mb-16">
          <div className="relative w-48 h-48 md:w-64 md:h-64 p-8 rounded-full bg-white flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <Image 
              src="/logo.png" 
              alt="Logo SI FEST" 
              width={200} 
              height={200}
              className="w-full h-auto object-contain relative z-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Filosofi Logo */}
          <div className="space-y-8">
            <h3 className="text-3xl font-heading font-bold text-white border-b border-white/10 pb-4 flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">📐</span>
              Filosofi Logo
            </h3>
            
            <div className="space-y-6">
              <div className="group">
                <h4 className="text-xl font-bold text-brand-accent mb-2 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center text-sm">1</span>
                  Figur Manusia
                </h4>
                <p className="text-white/70 leading-relaxed text-justify">
                  Melambangkan pengguna SI-FEST seperti peserta, panitia, dan masyarakat yang terlibat dalam festival. Bentuknya yang dinamis menggambarkan semangat antusiasme, kreativitas, dan aktivitas dalam sebuah festival.
                </p>
              </div>

              <div className="group">
                <h4 className="text-xl font-bold text-blue-400 mb-2 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-sm">2</span>
                  Kepala Komputer
                </h4>
                <p className="text-white/70 leading-relaxed text-justify">
                  Melambangkan teknologi dan sistem informasi yang menjadi bagian utama dari SI-FEST. Komputer menggambarkan proses pengelolaan dan penyampaian informasi festival agar dapat diakses dengan lebih mudah, cepat, dan terorganisir.
                </p>
              </div>

              <div className="group">
                <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">3</span>
                  Tulisan "SI-FEST"
                </h4>
                <p className="text-white/70 leading-relaxed text-justify">
                  Merupakan identitas dari Sistem Informasi Festival. Bentuk tulisan yang dinamis menggambarkan karakter sistem yang modern, kreatif, dan sesuai dengan suasana festival.
                </p>
              </div>

              <div className="group">
                <h4 className="text-xl font-bold text-brand-accent mb-2 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center text-sm">4</span>
                  Titik Hubung
                </h4>
                <p className="text-white/70 leading-relaxed text-justify">
                  Melambangkan penghubung antara manusia, teknologi, dan informasi. Titik ini menggambarkan peran SI-FEST dalam menghubungkan pengguna dengan berbagai informasi dan kegiatan festival.
                </p>
              </div>
            </div>
          </div>

          {/* Filosofi Warna */}
          <div className="space-y-8">
            <h3 className="text-3xl font-heading font-bold text-white border-b border-white/10 pb-4 flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">🎨</span>
              Filosofi Warna
            </h3>
            
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-accent/30 transition-colors">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#fde047] shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
                  <h4 className="text-xl font-bold text-white">Kuning</h4>
                </div>
                <div className="text-brand-accent font-semibold mb-2 text-sm uppercase tracking-wider">Semangat, Energi, & Kreativitas</div>
                <p className="text-white/70 leading-relaxed text-justify">
                  Warna kuning melambangkan keceriaan, optimisme, energi, antusiasme, dan kreativitas. Penggunaan warna kuning pada figur utama menggambarkan semangat masyarakat dalam berpartisipasi dan menikmati festival, sekaligus menunjukkan bahwa SI-FEST hadir sebagai sistem yang aktif dan memberikan pengalaman positif bagi penggunanya.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                  <h4 className="text-xl font-bold text-white">Biru</h4>
                </div>
                <div className="text-blue-400 font-semibold mb-2 text-sm uppercase tracking-wider">Teknologi, Informasi, & Kepercayaan</div>
                <p className="text-white/70 leading-relaxed text-justify">
                  Warna biru merepresentasikan teknologi digital, informasi, kepercayaan, stabilitas, dan profesionalisme. Warna ini memperkuat identitas SI-FEST sebagai sebuah sistem informasi berbasis teknologi yang diharapkan mampu menyediakan informasi secara terstruktur, terpercaya, dan mudah diakses.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
                  <h4 className="text-xl font-bold text-white">Putih</h4>
                </div>
                <div className="text-white/90 font-semibold mb-2 text-sm uppercase tracking-wider">Keterbukaan & Aksesibilitas</div>
                <p className="text-white/70 leading-relaxed text-justify">
                  Warna putih melambangkan keterbukaan, kejelasan, kesederhanaan, dan kemudahan. Putih menggambarkan harapan agar informasi yang disediakan melalui SI-FEST dapat disampaikan secara jelas, sederhana, transparan, dan mudah dipahami oleh seluruh pengguna.
                </p>
              </div>
            </div>
          </div>

        </div>
      </GlassCard>
    </div>
  );
}
