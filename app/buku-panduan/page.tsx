import { OFFICIAL_EVENTS } from "@/data/events";
import { Download, BookOpen, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Buku Panduan | SI FEST 2026",
  description: "Unduh buku panduan lengkap (Guidebook) untuk seluruh rangkaian acara SI FEST 2026.",
};

export default function BukuPanduanPage() {
  const eventsWithGuidebook = OFFICIAL_EVENTS.filter(e => e.guidebookUrl);
  const eventsWithoutGuidebook = OFFICIAL_EVENTS.filter(e => !e.guidebookUrl);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#001235] text-white pt-28 pb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#1856C9] blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#3B82F6] blur-[150px] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-black text-white text-glow mb-6 tracking-wide">
            Buku Panduan
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Unduh buku panduan (Guidebook) resmi SI FEST 2026 untuk mengetahui syarat, ketentuan, serta regulasi lengkap dari setiap perlombaan dan acara.
          </p>
        </div>

        {eventsWithGuidebook.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {eventsWithGuidebook.map((event) => (
              <div 
                key={event.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                      <BookOpen className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-glow transition-all">{event.title}</h3>
                      <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">{event.category}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 line-clamp-2 mb-6">
                    {event.shortDescription}
                  </p>
                </div>
                
                <Link 
                  href={event.guidebookUrl!} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40"
                >
                  <Download className="w-4 h-4" />
                  Unduh PDF Panduan
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-sm mb-16 relative overflow-hidden group">
            {/* Animasi latar belakang tipis */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/0 via-brand-primary/5 to-brand-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <BookOpen className="w-14 h-14 text-brand-accent mx-auto mb-5 opacity-80 animate-pulse" />
            <h3 className="text-2xl font-black text-white mb-3 text-glow">Guidebook Sedang Dirampungkan</h3>
            <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">
              Tim kami sedang menyusun panduan dan regulasi terbaik untuk memastikan pengalaman kompetisi yang luar biasa. Persiapkan dirimu, aturan main resminya akan segera mendarat di sini!
            </p>
          </div>
        )}

        {eventsWithoutGuidebook.length > 0 && (
          <div className="mt-12 pt-12 border-t border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              Segera Hadir
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {eventsWithoutGuidebook.map((event) => (
                <div key={event.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-300">{event.title}</h4>
                    <span className="text-[10px] text-slate-500 uppercase">Tahap Penyusunan</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
