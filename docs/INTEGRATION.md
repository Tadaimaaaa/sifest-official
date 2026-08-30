# INTEGRATION ARCHITECTURE

This document outlines the architecture and integration strategy between the **SI FEST 2026 Official Website** and the **Web Management Panitia** (`panitia.sifest.my.id`).

## 1. Current Architecture
- **Official Website**: Next.js App Router + Tailwind CSS v4 + Supabase PostgreSQL.
- Database foundation established with RLS and atomic RPC functions for registrations.

## 2. Existing Panitia Architecture
- **Web Panitia**: Next.js based dashboard.
- **Backend**: Google Apps Script communicating with Google Spreadsheet.
- Supports modules: Auth, Users, Roles, Keuangan, Sponsor, Surat, Produk, Pubdok.
- **CRITICAL NOTE**: The current Panitia system has NO native modules for Event Registration or Participants.

## 3. Data Flow
- Official Website handles participant registrations natively using Supabase.
- Web Panitia handles internal committee operations using Google Spreadsheet.

## 4. Source of Truth
- **Supabase**: Event schemas, Participant data, Registration status, and Payment transactions.
- **Google Spreadsheet**: Panitia users, Internal finance, Sponsorships, Administrative letters.

## 5. Recommended Architecture (Option C + Sync)
- **Direct Supabase Access**: The Panitia frontend repository should install Supabase SDK and read Registration/Participant data directly from Supabase, completely bypassing Google Apps Script. This prevents Spreadsheet rate-limiting and preserves data integrity.
- **Financial Synchronization**: Once a payment is verified by a Payment Gateway Webhook in the Official Website, an automated API trigger can post a summary of the income to the Apps Script `/addKeuangan` endpoint so it appears in the Panitia Financial Dashboard.

## 6. Security Vulnerabilities Found
- **Critical (doGet Unauthenticated)**: The Google Apps Script `doGet` function in `Code.gs` returns sensitive data (`getUsers`, `getKeuangan`) without verifying any session tokens. Anyone with the Apps Script deployment URL can dump the entire database.

## 7. Migration Strategy
No database migrations are required for the Spreadsheet. Supabase schemas defined in `supabase/migrations/001_initial_schema.sql` are sufficient. Do not overwrite or delete any Google Sheets.

## Phase 07B — Security Hardening
Dalam fase ini, endpoint `doGet` milik Panitia Apps Script telah diamankan dari akses publik yang tidak diotorisasi.

**Detail Perbaikan:**
- `Code.gs`: Menambahkan validasi `Auth.validateToken(e.parameter.token)` untuk menangkal akses ilegal. Jika token kosong/invalid, maka Apps Script mengembalikan response JSON `UNAUTHORIZED`.
- `Dashboard.gs`, `Users.gs`, `Keuangan.gs`, `Sponsor.gs`, `Surat.gs`, `Produk.gs`, `Pubdok.gs`: Memodifikasi signature fungsi utama (`getStats`, `getUsers`, `getTransactions`, dll) agar menerima objek `user`. Ini memungkinkan module backend untuk melakukan otorisasi (berbasis role) yang lebih spesifik jika diperlukan ke depannya.
- **Frontend Compatibility**: Aplikasi Panitia yang dibangun menggunakan Next.js (di repo *sifest-web*) sudah memiliki konfigurasi Axios Interceptor dan SWR fetcher (`src/lib/api.ts`) yang *secara otomatis* melampirkan parameter `token` pada semua request GET. Hal ini membuat perbaikan keamanan di backend 100% kompatibel dan tidak merusak fitur eksisting tanpa perlu pengubahan di sisi frontend.

## Phase 07C — Panitia ↔ Official SI FEST Registration Integration (Read-Only)
Pada fase ini, kami membangun fondasi integrasi agar data pendaftaran dari Official Website dapat dibaca langsung oleh Web Panitia.

**Arsitektur & Keamanan:**
- **Source of Truth:** Data peserta dan transaksi pembayaran dikelola 100% di Supabase (Official Website). Spreadsheet tetap digunakan hanya untuk operasional internal panitia (Keuangan, Surat, dll) sehingga tidak ada duplikasi data registrasi.
- **Data Flow:** Web Panitia (Next.js) terhubung langsung ke Supabase melalui *Server Components* dan *API Routes*.
- **Security:**
  - Pengambilan data pendaftar menggunakan `SUPABASE_SERVICE_ROLE_KEY`.
  - Akses `SUPABASE_SERVICE_ROLE_KEY` **hanya** terjadi di server (`server-only` package environment). Kredensial tidak pernah dikirim ke browser / client bundle (`NEXT_PUBLIC_` prefix dihilangkan untuk key tersebut).
  - UI Web Panitia tidak mengakses Supabase secara langsung, melainkan harus melewati Server Components Next.js yang memvalidasi sesi Auth Panitia eksisting sebelum melakukan fetching ke Supabase.
- **Fitur Baru (Modul SI FEST):**
  - Halaman Daftar Pendaftar dengan Server-Side Pagination.
  - URL Query Parameter based Search (Nama Peserta / Kode Pendaftaran).
  - URL Query Parameter based Filters (Event, Status Pendaftaran, Status Pembayaran).
  - Halaman Detail Pendaftar & Pembayaran (Read-only).
- **Kompatibilitas:** Backend Apps Script (`Code.gs`, dll) dan Database Spreadsheet sama sekali tidak disentuh untuk fitur SI FEST ini, sehingga sistem lama tetap berjalan sebagaimana mestinya.

## Phase 07C.1 — Implementasi ke Repository Utama
Pada fase ini, hasil implementasi `Phase 07C` (yang sebelumnya dibuat di *scratch repository*) telah diterapkan secara permanen ke repository utama Web Panitia (`sifest-web`).

**Status Integrasi:**
- File environment dan setup Supabase telah diimplementasikan (`server-only` client).
- Routes Next.js untuk Dashboard Pendaftar (`/sifest/registrations` dan detail) telah digabungkan ke struktur utama.
- Validasi build dan dependencies (`@supabase/supabase-js`, `server-only`) dipastikan berfungsi berdampingan dengan package Web Panitia yang sudah ada.
- Tidak ada modifikasi atau penghapusan modul eksisting berbasis Apps Script/Spreadsheet. Keduanya kini berjalan berdampingan pada repository yang sama.
