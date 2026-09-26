import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundAmbience } from "@/components/layout/BackgroundAmbience";
import { VolunteerForm } from "@/components/volunteer/VolunteerForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pendaftaran Volunteer | SI FEST 2026",
  description: "Daftar untuk menjadi Volunteer SI FEST 2026.",
};

export default function VolunteerPage() {
  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#0A192F]/40">
      <BackgroundAmbience />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-24 relative z-10 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">
            Pendaftaran Volunteer
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Jadilah bagian dari kepanitiaan ajang bergengsi SI FEST 2026! Silakan isi formulir di bawah ini dengan lengkap dan benar.
          </p>
        </div>

        <VolunteerForm />
      </div>

      <Footer />
    </main>
  );
}
