"use client";

import { useState } from "react";
import { createPayment } from "@/app/actions/paymentActions";
import { useRouter } from "next/navigation";

export function RetryPaymentButton({ registrationId }: { registrationId: string }) {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.push(`/payment/checkout/${registrationId}`)}
        className="w-full py-4 rounded-xl font-bold transition-all duration-300 bg-brand-primary text-brand-secondary hover:bg-brand-accent hover:shadow-[0_0_20px_rgba(245,183,22,0.4)]"
      >
        Coba Bayar Lagi
      </button>
    </>
  );
}
