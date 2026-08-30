import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { verifyCallbackSignature } from "@/lib/payment/duitku";

export async function POST(req: NextRequest) {
  try {
    // Duitku sends application/x-www-form-urlencoded
    const formData = await req.formData();
    
    const merchantCode = formData.get("merchantCode") as string;
    const amountStr = formData.get("amount") as string;
    const merchantOrderId = formData.get("merchantOrderId") as string;
    const signature = formData.get("signature") as string;
    const resultCode = formData.get("resultCode") as string;
    
    // Validasi input dasar
    if (!merchantCode || !amountStr || !merchantOrderId || !signature || !resultCode) {
      console.warn("[Duitku Webhook] Missing required fields");
      return new NextResponse("Bad Request", { status: 400 });
    }

    // 1. Verifikasi Signature
    const isValid = verifyCallbackSignature(merchantOrderId, amountStr, signature);
    if (!isValid) {
      console.error(`[Duitku Webhook] Invalid signature for order ${merchantOrderId}`);
      return new NextResponse("Invalid Signature", { status: 401 });
    }

    // 2. Cek transaksi di database
    const { data: transaction, error: txError } = await supabaseAdmin
      .from("transactions")
      .select("*")
      .eq("id", merchantOrderId)
      .single();

    if (txError || !transaction) {
      console.error(`[Duitku Webhook] Transaction not found: ${merchantOrderId}`);
      return new NextResponse("Transaction Not Found", { status: 404 });
    }

    // 3. Verifikasi amount
    const expectedAmount = parseFloat(transaction.amount);
    const receivedAmount = parseFloat(amountStr);
    
    if (expectedAmount !== receivedAmount) {
      console.error(`[Duitku Webhook] Amount mismatch. Expected ${expectedAmount}, got ${receivedAmount}`);
      return new NextResponse("Amount Mismatch", { status: 400 });
    }

    // 4. Idempotency Check
    if (transaction.status === "PAID") {
      console.log(`[Duitku Webhook] Transaction ${merchantOrderId} is already PAID. Ignoring.`);
      return NextResponse.json({ status: "success", message: "Already processed" }, { status: 200 });
    }

    // 5. Update Status
    let newStatus = transaction.status;
    
    if (resultCode === "00") {
      newStatus = "PAID";
    } else {
      // resultCode 01 = Failed in Duitku Callback
      newStatus = "FAILED";
    }
    
    if (newStatus !== transaction.status) {
      const updateData: any = {
        status: newStatus,
        updated_at: new Date().toISOString()
      };
      
      if (newStatus === "PAID") {
        updateData.paid_at = new Date().toISOString();
      }

      await supabaseAdmin
        .from("transactions")
        .update(updateData)
        .eq("id", merchantOrderId);
        
      if (newStatus === "PAID") {
        await supabaseAdmin
          .from("registrations")
          .update({ status: "CONFIRMED" })
          .eq("id", transaction.registration_id);
      }
    }

    // 6. Log the webhook
    const payload = Object.fromEntries(formData);
    await supabaseAdmin
      .from("payment_webhook_logs")
      .insert({
        transaction_id: merchantOrderId,
        provider: "duitku",
        event_type: `callback_${resultCode}`,
        payload: payload,
        processed: true
      });

    // Wajib mengembalikan HTTP 200 agar Duitku tidak melakukan retry
    return NextResponse.json({ status: "success" }, { status: 200 });

  } catch (error) {
    console.error("[Duitku Webhook] Exception:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
