# SI FEST 2026 Official Website

## Tujuan
Website resmi untuk acara SI FEST 2026 (Sistem Informasi Festival), HMJ Sistem Informasi UPI YPTK Padang. Website ini akan memuat informasi acara, timeline, dan memfasilitasi pendaftaran serta pembayaran peserta.

## Teknologi
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

## Struktur Folder Singkat
- `app/`: Routing & Layouts Next.js
- `components/`: Komponen UI modular
- `data/`: Lapisan data statis / abstraksi database
- `lib/`: Fungsi utilitas & konstanta
- `public/`: Aset statis (fonts, icons, images)
- `docs/`: Dokumentasi arsitektur, UI/UX, dan database

## Cara Menjalankan Project

1. Install dependencies:
   ```bash
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser.

## Environment Variables
Duplikasi `.env.example` menjadi `.env` atau `.env.local` dan sesuaikan nilainya (jika integrasi Supabase dan Payment Gateway sudah diimplementasikan).

## Development Workflow
Pastikan kode Anda aman dengan menjalankan validasi berikut sebelum melakukan commit:

```bash
npm run lint
npx tsc --noEmit
npm run build
```
