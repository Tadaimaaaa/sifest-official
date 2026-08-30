import { supabaseAdmin } from "@/lib/supabase/admin";
import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundAmbience } from "@/components/layout/BackgroundAmbience";
import { RetryPaymentButton } from "./RetryPaymentButton";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status Pembayaran",
  description: "Cek status pembayaran registrasi SI FEST 2026 Anda.",
};

export default async function PaymentStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // 1. Fetch Registrasi & Relasi
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

  const participant = Array.isArray(reg.participants) ? reg.participants[0] : reg.participants;
  const event = Array.isArray(reg.events) ? reg.events[0] : reg.events;

  // 2. Fetch Transaksi Terakhir
  const { data: tx } = await supabaseAdmin
    .from("transactions")
    .select("*")
    .eq("registration_id", id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  let statusText = "Tidak Ada Transaksi";
  let statusColor = "text-white/50";
  let badgeColor = "bg-white/10";
  
  if (!tx) {
    if (reg.status === "CONFIRMED") {
      statusText = "Terkonfirmasi (Gratis)";
      statusColor = "text-status-success";
      badgeColor = "bg-status-success/20";
    }
  } else {
    switch (tx.status) {
      case "PENDING":
        statusText = "Menunggu Pembayaran";
        statusColor = "text-status-warning";
        badgeColor = "bg-status-warning/20 border-status-warning/30";
        break;
      case "PAID":
        statusText = "Pembayaran Berhasil";
        statusColor = "text-status-success";
        badgeColor = "bg-status-success/20 border-status-success/30";
        break;
      case "EXPIRED":
        statusText = "Pembayaran Kedaluwarsa";
        statusColor = "text-status-error";
        badgeColor = "bg-status-error/20 border-status-error/30";
        break;
      case "FAILED":
      case "CANCELLED":
        statusText = "Pembayaran Gagal / Dibatalkan";
        statusColor = "text-status-error";
        badgeColor = "bg-status-error/20 border-status-error/30";
        break;
    }
  }

  const isFailed = tx && (tx.status === "EXPIRED" || tx.status === "FAILED" || tx.status === "CANCELLED");
  const isPending = tx && tx.status === "PENDING";
  
  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#0A192F]/40">
      <BackgroundAmbience />
      <Navbar />
      
      <div className="w-full relative z-10 pt-32 pb-24 min-h-[80svh] flex flex-col justify-center items-center">
        <Container>
          <div className="max-w-xl mx-auto space-y-6 glass-medium p-10 rounded-[2rem] border border-white/10">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-white mb-4 text-glow">
                Status Pendaftaran
              </h2>
              <div className={`inline-block px-6 py-2 rounded-full border ${badgeColor} backdrop-blur-md`}>
                <span className={`font-bold tracking-wide uppercase text-sm ${statusColor}`}>
                  {statusText}
                </span>
              </div>
            </div>

            <div className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-white/60">Kode Registrasi</span>
                <span className="text-brand-accent font-mono font-bold tracking-wider">{reg.registration_code}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-white/60">Nama Peserta</span>
                <span className="text-white font-medium text-right">{participant.full_name}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-white/60">Acara</span>
                <span className="text-white font-medium text-right">{event.name}</span>
              </div>
              {tx && (
                <>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-white/60">Order ID</span>
                    <span className="text-white/80 font-mono text-sm">{tx.id.substring(0, 8)}...</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Nominal</span>
                    <span className="text-white font-bold">
                      Rp {parseInt(tx.amount).toLocaleString('id-ID')}
                    </span>
                  </div>
                </>
              )}
              {!tx && reg.status === "CONFIRMED" && (
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Nominal</span>
                  <span className="text-status-success font-bold">Gratis</span>
                </div>
              )}
            </div>

            {isPending && (
              <div className="text-center p-4 bg-status-warning/10 rounded-xl border border-status-warning/20">
                <p className="text-status-warning text-sm">
                  Silakan selesaikan pembayaran Anda atau muat ulang (refresh) halaman ini jika Anda sudah membayar.
                </p>
                <button onClick={() => window.location.reload()} className="mt-3 text-white/80 hover:text-white underline text-sm">
                  Muat Ulang Status
                </button>
              </div>
            )}

            {isFailed && (
              <div className="pt-4">
                <p className="text-center text-white/60 text-sm mb-4">
                  Batas waktu pembayaran telah habis atau pembayaran dibatalkan. Silakan buat pesanan baru.
                </p>
                <RetryPaymentButton registrationId={reg.id} />
              </div>
            )}

            {!isFailed && !isPending && tx?.status === "PAID" && (
              <div className="pt-4 text-center">
                <p className="text-white/80 text-sm mb-4">
                  Terima kasih! Pembayaran Anda telah kami terima dan registrasi sudah aktif.
                </p>
                <Link href="/" className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all">
                  Kembali ke Beranda
                </Link>
              </div>
            )}
            
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
}
