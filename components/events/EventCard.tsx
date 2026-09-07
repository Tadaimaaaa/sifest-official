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
  return (
    <GlassCard variant="medium" interactive className="flex flex-col items-center text-center group">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[var(--radius-pill)] glass-strong group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(245,183,22,0.3)] transition-all duration-300 overflow-hidden relative p-3">
        {event.image ? (
          <Image src={event.image} alt={event.title} fill className="object-contain p-2" />
        ) : (
          IconMap[event.icon]
        )}
      </div>
      <div className="mb-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-brand-accent backdrop-blur-md">
        {event.category}
      </div>
      <h3 className="font-heading text-2xl font-bold text-white mb-3 text-glow group-hover:text-brand-accent transition-colors duration-300">
        {event.title}
      </h3>
      <p className="text-white/70 mb-4 flex-grow">
        {event.shortDescription}
      </p>
      {event.price && (
        <div className="mb-6 px-4 py-2 rounded-lg bg-white/10 border border-white/20 w-full">
          <span className="text-xs text-white/90 block mb-0.5 uppercase tracking-wider font-semibold">Biaya Pendaftaran</span>
          <span className="text-base font-bold text-brand-accent">{event.price}</span>
        </div>
      )}
      <Link href={`/events/${event.slug}`} className="w-full mt-auto">
        <Button variant="ghost" className="w-full border border-white/20 group-hover:border-brand-accent group-hover:text-brand-accent transition-all duration-300 glass-medium">
          Detail Acara
        </Button>
      </Link>
    </GlassCard>
  );
}
