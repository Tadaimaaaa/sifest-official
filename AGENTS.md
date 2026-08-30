# AGENTS / AI DEVELOPMENT CONTEXT

Dokumen ini menjadi **aturan utama development project SI FEST 2026**. Aturan ini harus selalu dipatuhi ketika melakukan perubahan pada project.

## PROJECT IDENTITY
- **Nama**: SI FEST 2026 Official Website
- **Penyelenggara**: HMJ Sistem Informasi UPI YPTK Padang
- **Tanggal**: 02–06 November 2026
- **Lokasi**: Universitas Putra Indonesia "YPTK" Padang

## ROLE
Development dilakukan dengan standar:
- Senior Full-Stack Developer
- Senior UI/UX Designer
- UI Engineer
- Web Performance Engineer
- Software Architect

## DESIGN PRINCIPLE
- **Identitas visual**: Y2K / Classic Futuristic Dreamy Sky
- **Karakter**: dreamy, futuristic, youthful, playful, premium, immersive, clean.
- **Batasan**: Jangan mengubah identitas menjadi cyberpunk, gaming, neon overload, sci-fi generik, atau template festival generik.
- Referensi visual SI FEST merupakan **source of truth** untuk identitas visual.

## PERFORMANCE PRINCIPLE
Performance adalah requirement utama. Prioritaskan:
- Server Components
- Static Rendering jika sesuai
- caching
- optimized images & lazy loading
- code splitting
- minimal JavaScript
- CSS animation
- optimized fonts

Hindari dependency yang tidak diperlukan, video background besar, dan WebGL/3D berat kecuali ada alasan kuat.

## UI/UX PRINCIPLE
Jangan mengorbankan usability demi estetika.
Informasi penting harus mudah ditemukan: event, jadwal, lokasi, persyaratan, pendaftaran, pembayaran, pengumuman, kontak.

## CODING PRINCIPLE
- TypeScript strict
- reusable components & modular architecture
- tidak menggunakan `any` tanpa alasan
- tidak melakukan duplicate code
- tidak meninggalkan unused code & console error
- gunakan semantic HTML
- mobile-first & accessibility-first

## DATABASE PRINCIPLE
UI tidak boleh langsung mencampurkan query database di banyak component.
Gunakan layer yang terorganisasi untuk data access.
Database direncanakan menggunakan: **Supabase / PostgreSQL**

## PAYMENT PRINCIPLE
Payment Gateway akan digunakan untuk pendaftaran event.
Flow: `Registration` ➔ `Transaction` ➔ `Payment Gateway` ➔ `Webhook` ➔ `Server Verification` ➔ `Database` ➔ `Registration Status`
Frontend tidak boleh menentukan status pembayaran `PAID` secara sepihak. Logic sensitif payment harus server-side.

## CHANGE MANAGEMENT
Sebelum melakukan perubahan besar pada database, payment, architecture, design system, atau authentication, baca dokumentasi terkait terlebih dahulu.
Jika perubahan bertentangan dengan dokumentasi:
1. identifikasi konflik
2. jelaskan alasan perubahan
3. update dokumentasi
4. baru implementasikan perubahan

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
