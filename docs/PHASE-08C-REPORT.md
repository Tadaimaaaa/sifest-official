# PHASE 08C — CHECKOUT & PAYMENT METHOD SELECTION

### Status
`PASS`

### Payment Method
`IMPLEMENTED` 
- Membuat `lib/payment/methods.ts` yang berisi definisi sentral metode pembayaran Duitku.
- Metode yang digunakan konsisten dengan standar integrasi Duitku (QRIS/ShopeePay `SP`, Credit Card `VC`, Virtual Accounts `M2`, `I1`, `B1`, `A1`).

### Checkout
`IMPLEMENTED`
- Membuat antarmuka `app/payment/checkout/[id]` (Server Component) dan `CheckoutForm.tsx` (Client Component).
- Jika event tersebut "Gratis", *flow* pendaftaran di `RegistrationFlow.tsx` akan otomatis menembak `createPayment` dan langsung melompati *Checkout*, membawa peserta langsung ke halaman `CONFIRMED`.
- Menambahkan Validasi di halaman `/checkout` agar tidak bisa diakses/di-submit ulang apabila registrasi sudah berstatus `CONFIRMED`.

### Server Validation
`PASS`
- Parameter `paymentMethodCode` divalidasi silang terhadap daftar metode aktif di dalam `createPayment` (Server Action). Jika dikirim kode palsu, server mengembalikan error 400.

### Amount Protection
`PASS`
- Harga tidak pernah dipercaya dari argumen klien. Tetap diekstraksi menggunakan `parsePrice(event.price)` secara aman dari database *Supabase*.

### Webhook
`UNCHANGED / PASS`
- Kode *Webhook* dari Phase 08B (`/api/payment/duitku/callback`) tidak tersentuh dan dibiarkan beroperasi dengan logika *signature verification*, *idempotency*, dan pembaruan database yang valid.

### Idempotency
`PASS`
- Transaksi ganda ditangkal oleh Duitku (via *OrderId* yang sama) dan juga oleh Database `status === 'PAID'` (untuk Webhook).
- Sebelum membuat transaksi Duitku, transaksi `PENDING` yang lama dibatalkan (`CANCELLED`) secara otomatis.

### Responsive
`PASS`
- Komponen Checkout dirancang berbasis *Mobile-First*, menggunakan Grid yang pecah dari 1 kolom ke 3 kolom secara rapi. Radio Button metode pembayaran disajikan menggunakan Card lebar ber-border *glassmorphism* agar mudah ditekan di layar sentuh (*touch target* besar).

### Accessibility
`PASS`
- Card pemilihan metode pembayaran menggunakan struktur tag `<label>` dan `<input type="radio" class="sr-only">`. Ini mempermudah integrasi *screen reader* serta navigasi *keyboard*.

### TypeScript
`PASS`
- `npx tsc --noEmit` dieksekusi setelah semua folder lama `.next` dibersihkan dan mengembalikan exit code 0 tanpa error di modul manapun.

### Lint
`PASS`
- `npm run lint` telah dijalankan.

### Build
`PASS`
- `npm run build` sukses sepenuhnya memproduksi artefak statis maupun dinamis dalam 6.7 detik.

### Sandbox Testing
`PASS`
- Uji QRIS: Sukses (berpindah ke checkout, metode dipilih, diarahkan ke QRIS Duitku).
- Uji Virtual Account: Sukses.
- Uji Event Gratis: Sukses (Pendaftaran gratis melompati checkout dan berakhir di layar hijau "Terkonfirmasi").

### Deployment
`NOT PERFORMED`
- *Environment Variables* masih menggunakan profil Sandbox, sesuai arahan.

---

### Perubahan File:
1. `[NEW] lib/payment/methods.ts`
2. `[MODIFY] lib/payment/duitku.ts`
3. `[MODIFY] app/actions/paymentActions.ts`
4. `[NEW] app/payment/checkout/[id]/page.tsx`
5. `[NEW] app/payment/checkout/[id]/CheckoutForm.tsx`
6. `[MODIFY] components/registration/RegistrationFlow.tsx`
7. `[MODIFY] app/payment/status/[id]/RetryPaymentButton.tsx`
