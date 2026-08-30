import { RegistrationFlow } from "@/components/registration/RegistrationFlow";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundAmbience } from "@/components/layout/BackgroundAmbience";
import { getAllEvents } from "@/lib/events";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pendaftaran",
  description: "Daftar untuk mengikuti rangkaian kegiatan SI FEST 2026.",
};

interface RegistrationPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RegistrationPage({ searchParams }: RegistrationPageProps) {
  // Extract event slug from query parameters, handle Promise for Next.js 15+
  const resolvedSearchParams = await searchParams;
  const eventSlug = typeof resolvedSearchParams.event === "string" ? resolvedSearchParams.event : undefined;
  
  // Fetch events on server
  const events = getAllEvents();

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#0A192F]/40">
      <BackgroundAmbience />
      <Navbar />
      
      {/* Client Component for state management */}
      <RegistrationFlow initialEventSlug={eventSlug} events={events} />

      <Footer />
    </main>
  );
}
