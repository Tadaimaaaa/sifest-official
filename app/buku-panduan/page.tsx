import { getRegisterableEvents, EventData } from "@/lib/events";
import { Download, BookOpen, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Buku Panduan | SI FEST 2026",
  description: "Unduh buku panduan lengkap (Guidebook) untuk seluruh rangkaian acara SI FEST 2026.",
};

export default async function BukuPanduanPage() {
  const supabase = await createClient();
  const { data: guidebooks } = await supabase.from("guidebooks").select("*");
  
  // Create a map for fast lookup
  const guidebookMap = new Map();
  if (guidebooks) {
    guidebooks.forEach(g => {
      if (g.url) guidebookMap.set(g.event_id, g.url);
    });
  }

  const registerableEvents = getRegisterableEvents();

  // Merge static events with dynamic guidebook URLs
  const mergedEvents = registerableEvents.map(event => ({
    ...event,
    guidebookUrl: guidebookMap.get(event.id) || event.guidebookUrl
  }));

  const eventsWithGuidebook = mergedEvents.filter(e => e.guidebookUrl);
  const eventsWithoutGuidebook = mergedEvents.filter(e => !e.guidebookUrl);

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
                className="bg-white/10 border border-white/20 rounded-[2rem] p-6 backdrop-blur-md hover:bg-white/15 hover:border-white/30 transition-all duration-300 group flex flex-col sm:flex-row gap-6 relative overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/0 via-brand-primary/10 to-brand-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Icon Left */}
                <div className="shrink-0 flex items-start justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 shadow-inner">
                    <BookOpen className="w-8 h-8 text-white group-hover:text-brand-accent transition-colors" />
                  </div>
                </div>

                {/* Content Right */}
                <div className="flex flex-col flex-1 z-10">
                  <div className="mb-3">
                    <span className="text-xs font-bold text-brand-accent uppercase tracking-widest">{event.category}</span>
                    <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-glow transition-all">{event.title}</h3>
                  </div>
                  <p className="text-sm text-slate-300 line-clamp-2 mb-5">
                    {event.shortDescription}
                  </p>
                  
                  <Link 
                    href={event.guidebookUrl!} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 text-sm mt-auto w-fit"
                  >
                    <Download className="w-4 h-4" />
                    Unduh PDF
                  </Link>
                </div>
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
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-brand-accent" />
              Segera Hadir (Tahap Penyusunan)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventsWithoutGuidebook.map((event) => (
                <div 
                  key={event.id} 
                  className="bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col sm:flex-row gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                >
                  <div className="shrink-0 flex items-start justify-center">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-black/20">
                      <BookOpen className="w-8 h-8 text-slate-400" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{event.category}</span>
                    <h4 className="text-xl font-bold text-white mt-1">{event.title}</h4>
                    <span className="inline-block mt-3 px-3 py-1 bg-white/10 rounded-lg text-xs font-medium text-slate-300 w-fit">
                      Tahap Penyusunan
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
  </>
  );
}
