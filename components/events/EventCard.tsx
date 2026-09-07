import { EventData } from "@/data/events";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { BookOpen, Gamepad2, GraduationCap, Store, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const IconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={48} strokeWidth={1.5} className="text-brand-accent drop-shadow-md" />,
  Trophy: <Trophy size={48} strokeWidth={1.5} className="text-brand-accent drop-shadow-md" />,
  Gamepad2: <Gamepad2 size={48} strokeWidth={1.5} className="text-brand-accent drop-shadow-md" />,
  BookOpen: <BookOpen size={48} strokeWidth={1.5} className="text-brand-accent drop-shadow-md" />,
  Store: <Store size={48} strokeWidth={1.5} className="text-brand-accent drop-shadow-md" />,
};

export function EventCard({ event }: { event: EventData }) {
  const hasPrice = !!event.price;

  return (
    <div className="relative group w-full h-full flex rounded-3xl p-[2px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(245,183,22,0.5)]">
      {/* Striking Animated Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent via-[#ff512f] to-[#dd2476] opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-0"></div>
      
      {/* Glass Inner Card */}
      <div className="relative z-10 flex flex-col items-center text-center w-full h-full p-6 md:p-8 bg-[#0a1526]/95 backdrop-blur-xl rounded-[22px] border border-white/10">
        
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[var(--radius-pill)] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(245,183,22,0.4)] transition-all duration-300 overflow-hidden relative p-3">
          {event.image ? (
            <Image src={event.image} alt={event.title} fill className="object-contain p-2" />
          ) : (
            IconMap[event.icon]
          )}
        </div>
        
        <div className="mb-3 rounded-full bg-brand-accent/20 border border-brand-accent/30 px-3 py-1 text-xs font-semibold text-brand-accent">
          {event.category}
        </div>
        
        <h3 className="font-heading text-2xl font-bold text-white mb-3 text-glow group-hover:text-brand-accent transition-colors duration-300">
          {event.title}
        </h3>
        
        <p className="text-white/70 mb-6 flex-grow text-sm md:text-base leading-relaxed">
          {event.shortDescription}
        </p>
        
        <div className="w-full mt-auto">
          {hasPrice && (
            <div className="mb-4 pt-4 border-t border-white/10 flex flex-col items-center justify-center">
              <span className="text-xs text-white/50 mb-1">Biaya Pendaftaran</span>
              <span className="text-lg font-bold text-brand-accent drop-shadow-[0_0_10px_rgba(245,183,22,0.5)]">
                {event.price}
              </span>
            </div>
          )}
          
          <Link href={`/events/${event.slug}`} className="w-full block">
            <Button variant="ghost" className="w-full border border-brand-accent/30 bg-brand-accent/10 group-hover:bg-brand-accent group-hover:text-[#0A192F] text-brand-accent font-bold transition-all duration-300 rounded-xl">
              Detail Acara
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
