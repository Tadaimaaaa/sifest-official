import { getEventBySlug, getAllEvents, getRelatedEvents } from "@/lib/events";
import { EventHero } from "@/components/events/EventHero";
import { EventInfo } from "@/components/events/EventInfo";
import { RelatedEvents } from "@/components/events/RelatedEvents";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/navigation/Navbar";
import { BackgroundAmbience } from "@/components/layout/BackgroundAmbience";
import { Container } from "@/components/ui/Container";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const events = getAllEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const event = getEventBySlug(resolvedParams.slug);
  
  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: event.title,
    description: event.shortDescription,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const event = getEventBySlug(resolvedParams.slug);

  if (!event) {
    notFound();
  }

  const relatedEvents = getRelatedEvents(event.slug, 3);

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#0A192F]/40">
      <BackgroundAmbience />
      <Navbar />

      {/* Breadcrumbs */}
      <div className="absolute top-24 left-0 w-full z-20">
        <Container>
          <div className="flex items-center gap-2 text-sm text-white/50 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <ChevronRight size={14} />
            <Link href="/events" className="hover:text-white transition-colors">Acara</Link>
            <ChevronRight size={14} />
            <span className="text-white/90">{event.title}</span>
          </div>
        </Container>
      </div>

      <EventHero event={event} />

      <section className="relative w-full pb-32">
        <Container className="relative z-10">
          <EventInfo event={event} />
        </Container>
      </section>

      <RelatedEvents events={relatedEvents} />
      
      <Footer />
    </main>
  );
}
