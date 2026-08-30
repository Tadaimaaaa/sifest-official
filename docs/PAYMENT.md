# PAYMENT GATEWAY INTEGRATION

**(Terintegrasi menggunakan Duitku Server SDK & Webhook pada PHASE 08B)**

## Provider Utama: Duitku
Seluruh pembayaran SI FEST diproses melalui **Duitku API v2** (Inquiry / Create Payment & Webhook).

## Payment Flow

```text
User
 ↓
Registration (Pilih Lomba & Isi Form)
 ↓
Create Transaction (Server Side - app/actions/paymentActions.ts)
 ↓
Duitku API (v2/inquiry) - Mengembalikan Payment URL
 ↓
User Dialihkan ke Payment URL Duitku (Untuk Memilih Metode Pembayaran & Membayar)
 ↓
User Membayar via QRIS/VA/E-Wallet
 ↓
Webhook Callback (Duitku mengirim POST ke /api/payment/duitku/callback)
 ↓
Server Verification (Verifikasi HMAC SHA256 Signature)
 ↓
Update Transaction & Registration Status (Di Database Supabase)
 ↓
User Dialihkan Kembali ke Website SI FEST (Return URL)
```

## Transaction Status
- `PENDING`
- `PAID` (Dikonversi ke `CONFIRMED` di tabel `registrations`)
- `EXPIRED`
- `FAILED`
- `CANCELLED`

## Security Principles
- Secret key (`DUITKU_API_KEY`) HANYA berada di server-side (`.env.local`).
- Tidak boleh ada API Key maupun Merchant Code yang ter-ekspos ke client (Browser).
- Webhook WAJIB diverifikasi keasliannya (menggunakan HMAC SHA256).
- Frontend TIDAK DAPAT menentukan status `PAID` secara sepihak. Status bergantung mutlak pada webhook.
- Transaction ID menggunakan `UUID` untuk menghindari prediksi ID berurutan.
- Amount (Jumlah nominal) dibaca langsung dari `events.price` di database, BUKAN dari input client.
- Webhook bersifat *idempotent* (menolak pemrosesan ganda jika status sudah `PAID`).
- Payload webhook dilogging secara mentah ke `payment_webhook_logs` untuk audit trail.
