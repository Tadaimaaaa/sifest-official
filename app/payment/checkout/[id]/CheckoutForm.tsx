"use client";

import { useState } from "react";
import { PAYMENT_METHODS } from "@/lib/payment/methods";
import { createPayment } from "@/app/actions/paymentActions";
import { useRouter } from "next/navigation";

interface CheckoutFormProps {
  registrationId: string;
  registrationCode: string;
  participantName: string;
  eventName: string;
  priceString: string;
}

export function CheckoutForm({
  registrationId,
  registrationCode,
  participantName,
  eventName,
  priceString
}: CheckoutFormProps) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fallback parsing on client just for display purposes
  // Actual parsing and truth is on the server
  let displayPrice = 0;
  const lowerPrice = priceString?.toLowerCase().trim() || "";
  if (lowerPrice === "gratis" || lowerPrice === "free" || lowerPrice === "0") {
    displayPrice = 0;
  } else {
    const digitsOnly = priceString?.replace(/\D/g, "");
    displayPrice = digitsOnly ? parseInt(digitsOnly, 10) : 0;
  }

  const handlePayNow = async () => {
    if (!selectedMethod) {
      setError("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createPayment(registrationId, selectedMethod);
      if (result.success && result.paymentUrl) {
        router.push(result.paymentUrl);
      } else if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl);
      } else {
        setError(result.error || "Gagal membuat transaksi pembayaran.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghubungi server pembayaran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Payment Methods */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-xl font-bold text-white mb-4">Pilih Metode Pembayaran</h2>
        
        {error && (
          <div className="w-full bg-status-warning/10 border border-status-warning/20 text-status-warning p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PAYMENT_METHODS.filter(m => m.enabled).map((method) => {
            const isSelected = selectedMethod === method.code;
            return (
              <label 
                key={method.code}
                className={`relative flex flex-col p-5 cursor-pointer rounded-2xl border transition-all duration-300 ${
                  isSelected 
                    ? "bg-brand-primary/10 border-brand-accent shadow-[0_0_15px_rgba(245,183,22,0.15)]" 
                    : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value={method.code} 
                  checked={isSelected}
                  onChange={() => setSelectedMethod(method.code)}
                  className="sr-only"
                />
                
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-lg">{method.name}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? "border-brand-accent" : "border-white/30"
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />}
                  </div>
                </div>
                
                <div className="mt-auto pt-2 border-t border-white/5">
                  <span className="text-xs uppercase tracking-wider text-brand-accent/80 font-bold mb-1 block">
                    {method.category}
                  </span>
                  {method.description && (
                    <span className="text-sm text-white/60 block line-clamp-2">
                      {method.description}
                    </span>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="lg:col-span-1">
        <div className="glass-strong rounded-2xl p-6 sticky top-32 border border-white/10 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-6 pb-4 border-b border-white/10">Ringkasan Pesanan</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Acara</p>
              <p className="text-white font-medium">{eventName}</p>
            </div>
            
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Peserta</p>
              <p className="text-white font-medium">{participantName}</p>
            </div>
            
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Kode Pendaftaran</p>
              <p className="text-brand-accent font-mono tracking-wider">{registrationCode}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/10 mb-8">
            <div className="flex justify-between items-end mb-2">
              <p className="text-white/70">Total Bayar</p>
              <p className="text-2xl font-bold text-white">
                Rp {displayPrice.toLocaleString('id-ID')}
              </p>
            </div>
            {selectedMethod && (
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                <span className="text-xs text-white/50">Metode:</span>
                <span className="text-xs font-bold text-brand-accent">
                  {PAYMENT_METHODS.find(m => m.code === selectedMethod)?.name}
                </span>
              </div>
            )}
          </div>
          
          <button
            onClick={handlePayNow}
            disabled={!selectedMethod || isSubmitting}
            className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
              (!selectedMethod || isSubmitting)
                ? "bg-white/5 text-white/40 cursor-not-allowed border border-white/10"
                : "bg-brand-primary text-brand-secondary hover:bg-brand-accent hover:shadow-[0_0_20px_rgba(245,183,22,0.4)] border border-transparent"
            }`}
          >
            {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
          </button>
          
          <p className="text-center text-xs text-white/40 mt-4 leading-relaxed">
            Dengan menekan tombol di atas, Anda menyetujui syarat & ketentuan SI FEST.
          </p>
        </div>
      </div>
    </div>
  );
}
