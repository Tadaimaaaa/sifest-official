import { supabaseAdmin } from "@/lib/supabase/admin";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundAmbience } from "@/components/layout/BackgroundAmbience";
import { CheckoutForm } from "./CheckoutForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout Pembayaran",
  description: "Pilih metode pembayaran dan selesaikan transaksi Anda.",
};

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const { data: reg, error: regError } = await supabaseAdmin
    .from("registrations")
    .select("*, events(*), participants(*)")
    .eq("id", id)
    .single();

  if (regError || !reg) {
    return (
      <main className="relative min-h-[100svh] bg-[#0A192F] flex items-center justify-center">
        <Navbar />
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Registrasi Tidak Ditemukan</h1>
            <Link href="/" className="text-brand-accent hover:underline">Kembali ke Beranda</Link>
          </div>
        </Container>
      </main>
    );
  }

  // Jika sudah sukses/paid, jangan boleh checkout lagi
  if (reg.status === "CONFIRMED") {
    return (
      <main className="relative min-h-[100svh] bg-[#0A192F] flex items-center justify-center">
        <Navbar />
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Registrasi Sudah Lunas</h1>
            <p className="text-white/70 mb-4">Pendaftaran ini sudah terkonfirmasi.</p>
            <Link href={`/payment/status/${id}`} className="text-brand-accent hover:underline">Lihat Status</Link>
          </div>
        </Container>
      </main>
    );
  }

  const participant = Array.isArray(reg.participants) ? reg.participants[0] : reg.participants;
  const event = Array.isArray(reg.events) ? reg.events[0] : reg.events;

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#0A192F]/40">
      <BackgroundAmbience />
      <Navbar />
      
      <div className="w-full relative z-10 pt-32 pb-24 min-h-[80svh]">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center px-6 py-2 rounded-full glass-strong border-white/20 mb-6">
                <span className="text-sm font-bold tracking-widest text-brand-accent uppercase">
                  CHECKOUT
                </span>
              </div>
              <h1 className="font-heading text-4xl font-bold text-white mb-4 text-glow">
                Selesaikan Pembayaran
              </h1>
            </div>

            <CheckoutForm 
              registrationId={id} 
              registrationCode={reg.registration_code}
              participantName={participant.full_name}
              eventName={event.name}
              priceString={event.price}
            />
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
}
