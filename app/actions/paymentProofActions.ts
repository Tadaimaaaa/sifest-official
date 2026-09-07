"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function updatePaymentProofUrl(registrationId: string, url: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseAdmin
      .from("registrations")
      .update({ payment_proof_url: url })
      .eq("id", registrationId);

    if (error) {
      console.error("[Payment Proof] DB Update Error:", error);
      return { success: false, error: "Gagal menyimpan bukti pembayaran." };
    }

    return { success: true };
  } catch (err) {
    console.error("[Payment Proof] Exception:", err);
    return { success: false, error: "Terjadi kesalahan internal pada server." };
  }
}
