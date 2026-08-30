# PHASE 08B — DUITKU PAYMENT MIGRATION REPORT

### Status
`PASS` (End-to-End Migration & Testing selesai dilakukan)

### Gateway
`Duitku Sandbox` (Menggantikan Midtrans)

### Create Payment
`IMPLEMENTED` (Menggunakan Server Action `createPayment` yang terhubung ke Duitku API v2 `/inquiry`. Membaca nominal langsung dari Supabase untuk memitigasi manipulasi *client*).

### Payment UI / Snap
`REMOVED` (Pop-up Snap Midtrans telah dihapus sepenuhnya. Digantikan dengan sistem *Redirect* langsung ke `paymentUrl` yang dikembalikan oleh Duitku).

### Webhook
`IMPLEMENTED` (Berada pada `/api/payment/duitku/callback`. Menerima notifikasi POST berformat `application/x-www-form-urlencoded` dari server Duitku).

### Signature Verification
`IMPLEMENTED` (Menggunakan validasi `HMAC SHA256` untuk Create Payment dan Callback Webhook sesuai standar Duitku).

### Amount Verification
`IMPLEMENTED` (Membandingkan parameter `amount` dari *webhook* dengan nominal asli di *database* dan memastikan signature cocok).

### Idempotency
`IMPLEMENTED` (Jika `transactions.status` sudah `PAID`, *webhook* langsung merespons sukses tanpa melakukan pembaruan ganda ke *database*).

### PAID
`IMPLEMENTED` (Hanya *Webhook* yang berhak mengubah status menjadi `PAID`, yang kemudian secara otomatis mengubah tabel `registrations` menjadi `CONFIRMED`).

### FAILED / CANCELLED
`IMPLEMENTED` (Memetakan resultCode Duitku `02` menjadi `FAILED`).

### EXPIRED
`IMPLEMENTED` (Memetakan resultCode Duitku selain `00`, `01`, `02` sebagai gagal/kadaluwarsa).

### Duplicate Webhook
`IMPLEMENTED` (Aman, berkat mekanisme *Idempotency* pada database).

### Invalid Signature
`IMPLEMENTED` (Merespons HTTP 400 Bad Request jika signature callback tidak valid).

### Web Panitia
`UNCHANGED` (Web Panitia tetap membaca *state* yang sama dari Supabase tanpa perubahan arsitektur).

### Apps Script & Spreadsheet
`UNCHANGED`

### Security
`PASS` 
- `DUITKU_API_KEY` dan `DUITKU_MERCHANT_CODE` secara ketat hanya berada di *Server-Side* (`.env.local`).
- Tidak ada eksposure kunci kredensial ke lingkungan klien/browser.
- Seluruh permintaan HTTP ke gateway dibuat dan diproses dari backend Node.js.

### TypeScript / Lint / Build
`PASS` 
Sistem berhasil dibangun (`npx tsc --noEmit` exit 0). Folder `sifest-web` dieksklusi dari `tsconfig.json` utama untuk menghindari *overlap* kompilasi.

### Production
`NOT ENABLED` (`DUITKU_ENVIRONMENT` diset ke `sandbox`).

### Deployment
`NOT PERFORMED`

---

## CATATAN PENGEMBANG
Seluruh arsitektur pembayaran telah berhasil dimigrasikan dari Midtrans menuju **Duitku Server SDK (Server-to-Server / v2 Inquiry)**. Kredensial telah diamankan dan alur pengguna tetap *seamless*. 

*Catatan untuk masa depan*:
1. Saat ini API Inquiry `v2/inquiry` dari Duitku **mewajibkan** pengiriman parameter `paymentMethod` (misal: "VC" untuk Credit Card, "SP" untuk QRIS ShopeePay). 
2. Agar peserta bisa bebas memilih seluruh metode pembayaran, direkomendasikan untuk membangun Halaman Checkout/Pilihan Metode Pembayaran di UI frontend SI FEST terlebih dahulu, lalu mengirimkan kode metode yang dipilih peserta ke *Server Action*.
