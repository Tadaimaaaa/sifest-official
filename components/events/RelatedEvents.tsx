import { EventData } from "@/data/events";
import { EventGrid } from "@/components/events/EventGrid";
import { Container } from "@/components/ui/Container";
import React from "react";

export function RelatedEvents({ events }: { events: EventData[] }) {
  if (events.length === 0) return null;

  return (
    <section className="py-24 border-t border-white/10 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <Container className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 text-glow">
            ACARA LAINNYA
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Jelajahi kompetisi dan seminar menarik lainnya di SI FEST 2026.
          </p>
        </div>
        
        <EventGrid events={events} />
      </Container>
    </section>
  );
}
