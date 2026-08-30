# ARCHITECTURE

## Tech Stack
- Next.js (App Router) - **IMPLEMENTED**
- React Server Components - **IMPLEMENTED**
- TypeScript - **IMPLEMENTED**
- Tailwind CSS v4 - **IMPLEMENTED**

## Rendering Strategy
- Default: React Server Components (RSC) / Static Rendering - **IMPLEMENTED**
- Client Components: Digunakan secara selektif untuk interaktivitas - **IMPLEMENTED**

## Folder Structure
Modular Components Architecture:
- `app/` (Routing: Termasuk Dynamic Route `/events/[slug]` dan `/registration`) - **IMPLEMENTED**
- `components/` (UI, Layout, Domain-specific: Memiliki batas Client/Server tegas seperti `RegistrationFlow.tsx` sebagai Client Component) - **IMPLEMENTED**
- `data/` (Static/Mock Data layer) - **IMPLEMENTED**
- `lib/` (Utilities, Constants) - **IMPLEMENTED**
- `public/` (Images, Icons, Fonts) - **IMPLEMENTED**

## Component Architecture
Atomic Design & Domain-driven. Pemisahan antara UI foundation (glass card, buttons) dan fitur domain (event card). - **IMPLEMENTED**

## Data Architecture
Alur pengolahan data menggunakan arsitektur Klien-Server-Supabase:
1. UI Form Client Component -> `app/actions/registrationActions.ts` (Server-side validation)
2. `registrationActions.ts` -> `lib/data/registrations.ts` (Data Layer)
3. Data Layer -> Supabase (menggunakan `admin.ts` ber-Service Role untuk _bypass_ RLS) - **IMPLEMENTED**

Data acara saat ini disuplai melalui file statis (`data/events.ts`) dengan *helper functions* (`lib/events.ts`) sebagai perantara (*Data Service Layer* sementara). - **IMPLEMENTED**

Kontrak data untuk pendaftaran telah disiapkan melalui tipe `RegistrationDraft` di `lib/types/registration.ts`. Tipe ini dirancang untuk dapat berekspansi di masa depan (misal: menambahkan kolom Nama Tim untuk E-Sport). - **IMPLEMENTED**

## Image Strategy
`next/image` dengan AVIF/WebP, dipisahkan berdasarkan folder domain di `public/images/`. - **IMPLEMENTED**

## Performance Strategy
- CSS Animation over JS Animation - **IMPLEMENTED**
- Lazy loading & Code splitting - **IMPLEMENTED**
- Preload font via `next/font` - **IMPLEMENTED**

## Future Integrations
- Supabase Integration - **IMPLEMENTED (Registrations Data Layer)**
- Admin Dashboard (Web Panitia) - **IMPLEMENTED (Phase 07C.1: Live Read-Only Registration Data on Main Repo)**
- Payment Gateway Integration - **IMPLEMENTED (Duitku SDK & Webhook in Phase 08B)**
