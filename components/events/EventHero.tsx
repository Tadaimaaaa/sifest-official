import { EventData } from "@/data/events";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EventRegistrationButton } from "./EventRegistrationButton";
import Link from "next/link";
import React from "react";

export function EventHero({ event }: { event: EventData }) {
  return (
    <section className="relative w-full pt-32 md:pt-40 pb-16 block">
      <Container className="relative z-10 block w-full text-center">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-[var(--radius-pill)] glass-strong border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-6 mx-auto w-auto max-w-[95%]">
            <span className="text-sm font-bold tracking-[0.1em] text-brand-accent uppercase">
              {event.category}
            </span>
          </div>
          
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 text-glow">
            {event.title}
          </h1>
          
          <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed block w-full mb-12">
            {event.shortDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full px-4 sm:px-0">
            <EventRegistrationButton
              slug={event.slug}
              category={event.category}
              status={event.status}
              isQuotaFull={event.isQuotaFull}
              href={`/registration?event=${event.slug}`}
              variant="hero"
            />
            <Link href={event.guidebookUrl || "#"} target={event.guidebookUrl ? "_blank" : "_self"} rel="noopener noreferrer" className="w-full sm:w-auto block">
              <Button size="lg" variant="glass" className="w-full sm:w-64 whitespace-nowrap text-white">
                Buku Panduan
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
