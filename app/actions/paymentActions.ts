"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createDuitkuTransaction } from "@/lib/payment/duitku";
import crypto from "crypto";

export type PaymentResult = {
  success: boolean;
  token?: string; // Kept for backward compatibility with Midtrans Snap UI if needed
  paymentUrl?: string; // Duitku hosted page
  redirectUrl?: string; // Free event redirect
  error?: string;
};

/**
 * Aman mem-parsing harga dari string (misal: "Rp 250.000 / Tim" -> 250000)
 */
function parsePrice(priceText: string): number {
  if (!priceText) return 0;
  
  const lowerText = priceText.toLowerCase().trim();
  if (lowerText === "gratis" || lowerText === "free" || lowerText === "0") {
    return 0;
  }
  
  if (lowerText === "menyusul" || lowerText.includes("menunggu")) {
    throw new Error("Nominal harga untuk event ini belum tersedia (Menyusul).");
  }
  
  const digitsOnly = priceText.replace(/\D/g, "");
  if (!digitsOnly) {
    throw new Error("Nominal harga tidak valid atau tidak ditemukan dalam teks.");
  }
  
  return parseInt(digitsOnly, 10);
}

import { PAYMENT_METHODS } from "@/lib/payment/methods";

export async function createPayment(registrationId: string, paymentMethodCode?: string): Promise<PaymentResult> {
  try {
    if (!registrationId) {
      return { success: false, error: "ID Registrasi tidak valid." };
    }

    // 1. Ambil registration, event, participant
    const { data: reg, error: regError } = await supabaseAdmin
      .from("registrations")
      .select("*, events(*), participants(*)")
      .eq("id", registrationId)
      .single();

    if (regError || !reg) {
      return { success: false, error: "Data registrasi tidak ditemukan." };
    }

    if (reg.status === "CONFIRMED") {
      return { success: false, error: "Pendaftaran ini sudah lunas / terkonfirmasi." };
    }

    // Ekstrak data (Supabase one-to-many relationship dikembalikan sebagai array)
    const event = Array.isArray(reg.events) ? reg.events[0] : reg.events;
    const participant = Array.isArray(reg.participants) ? reg.participants[0] : reg.participants;

    if (!event || !participant) {
      return { success: false, error: "Data event atau peserta tidak lengkap." };
    }

    // 2. Batalkan transaksi PENDING sebelumnya untuk pendaftaran ini (jika ada)
    const { data: existingTx } = await supabaseAdmin
      .from("transactions")
      .select("*")
      .eq("registration_id", registrationId)
      .eq("status", "PENDING")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (existingTx) {
      await supabaseAdmin
        .from("transactions")
        .update({ status: "CANCELLED" })
        .eq("id", existingTx.id);
    }

    // 3. Tentukan nominal dari database dengan aman
    let amount = 0;
    try {
      amount = parsePrice(event.price);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Gagal memproses nominal harga event.";
      return { success: false, error: errorMessage };
    }

    if (amount === 0) {
      // Jika gratis, langsung confirm tanpa gateway
      await supabaseAdmin
        .from("registrations")
        .update({ status: "CONFIRMED" })
        .eq("id", registrationId);
      
      return { success: true, redirectUrl: `/payment/status/${registrationId}` };
    }

    if (!paymentMethodCode) {
      return { success: false, error: "Metode pembayaran harus dipilih." };
    }

    const isValidMethod = PAYMENT_METHODS.some(m => m.code === paymentMethodCode && m.enabled);
    if (!isValidMethod) {
      return { success: false, error: "Metode pembayaran tidak valid atau tidak tersedia." };
    }

    // 4. Buat Transaction Record dengan UUID baru sebagai Order ID
    const transactionId = crypto.randomUUID();

    const { error: insertError } = await supabaseAdmin
      .from("transactions")
      .insert({
        id: transactionId,
        registration_id: registrationId,
        amount: amount,
        status: "PENDING",
        provider: "duitku",
        payment_method: paymentMethodCode
      });

    if (insertError) {
      return { success: false, error: "Gagal membuat transaksi di database." };
    }

    // 5. Request ke Duitku API
    const callbackUrl = process.env.DUITKU_CALLBACK_URL || `http://localhost:3000/api/payment/duitku/callback`;
    const returnUrl = process.env.DUITKU_RETURN_URL || `http://localhost:3000/payment/status/${registrationId}`;
    
    // Replace domain for returnUrl if testing on Vercel preview or ngrok
    // In actual production, ensure DUITKU_RETURN_URL in .env has the base URL
    // Here we make sure the returnUrl directs back to the specific status page
    const actualReturnUrl = returnUrl.endsWith('/payment/status') 
      ? `${returnUrl}/${registrationId}` 
      : returnUrl;

    const requestPayload = {
      paymentAmount: amount,
      paymentMethod: paymentMethodCode,
      merchantOrderId: transactionId,
      productDetails: event.name.substring(0, 255),
      email: participant.email,
      customerVaName: participant.full_name.substring(0, 20), // Duitku va name max length 20
      phoneNumber: participant.whatsapp,
      itemDetails: [{
        name: event.name.substring(0, 50),
        price: amount,
        quantity: 1
      }],
      callbackUrl,
      returnUrl: actualReturnUrl,
      expiryPeriod: 1440 // 24 hours
    };

    const transaction = await createDuitkuTransaction(requestPayload);

    // Update the transaction with Duitku's reference (provider_transaction_id)
    if (transaction.reference) {
      await supabaseAdmin
        .from("transactions")
        .update({ provider_transaction_id: transaction.reference })
        .eq("id", transactionId);
    }

    return {
      success: true,
      paymentUrl: transaction.paymentUrl,
    };
  } catch (error: any) {
    console.error("[Server Action] createPayment error:", error);
    
    if (error.message && error.message.includes("DUITKU")) {
      return { success: false, error: "Konfigurasi Duitku belum tersedia di server." };
    }
    
    return { success: false, error: "Terjadi kesalahan saat memproses permintaan pembayaran ke gateway Duitku." };
  }
}
