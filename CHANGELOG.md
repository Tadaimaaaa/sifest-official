# Changelog

Semua perubahan besar pada project ini akan didokumentasikan dalam file ini.

## [0.7.2] Phase 07C.1 - Terapkan Integrasi Web Panitia ke Repository Utama
### Added
- (Web Panitia) Deploy read-only integration with Supabase for Registration to the main `sifest-web` repository.
- (Web Panitia) Side-by-side coexistence of Apps Script modules (Spreadsheet) and Supabase data (SI FEST Registrations).

## [0.7.1] Panitia ↔ Official SI FEST Registration Integration (Phase 07C)
### Added
- (Web Panitia) Read-only integration with Supabase using `SUPABASE_SERVICE_ROLE_KEY` securely isolated in a `server-only` client.
- (Web Panitia) `Data Pendaftar` dashboard (`/sifest/registrations`) with Server-Side Search, Pagination, Event filtering, and Payment filtering.
- (Web Panitia) Detail view page for Registration, Participant, and Transaction (`/sifest/registrations/[id]`).
- (Web Panitia) Supabase Types and modular data fetch layer in `src/lib/sifest/registrations.ts`.

## [0.7.0] Panitia API Security Hardening
### Changed
- (Web Panitia) Secured `doGet` endpoint with `Auth.validateToken` requirement.
- (Web Panitia) Updated signature of `Dashboard`, `Users`, `Keuangan`, `Sponsor`, `Surat`, `Produk`, and `Pubdok` modules to accept `user` parameter for authorization.

## [0.6.0] Database & Backend Foundation
### Added
- Supabase integration (`@supabase/supabase-js`, `@supabase/ssr`)
- Server and Admin clients (`lib/supabase/`)
- Initial database schema & RLS migration (`supabase/migrations/`)
- Atomic Registration RPC function
- Server-side validation via Server Actions (`app/actions/registrationActions.ts`)
- Registration submit data layer (`lib/data/registrations.ts`)
- Confirmation state UI in `RegistrationFlow.tsx`

## [0.5.0] Registration UX
### Added
- Registration page (`/registration`)
- Multi-step registration flow (`RegistrationFlow.tsx` Client Component)
- Event selection step (`StepEventSelection.tsx`)
- Participant form step with client-side validation (`StepParticipantData.tsx`)
- Review step (`StepReview.tsx`)
- Registration data contract (`lib/types/registration.ts`)

## [0.4.0] Event Experience
### Added
- Events index (`/events`)
- Dynamic event detail pages (`/events/[slug]`)
- Event data architecture (`lib/events.ts`, expanded `EventData`)
- Event navigation & Event Hero
- Related events section
- Not found handling (`/events/[slug]/not-found.tsx`)

## [0.3.0] Homepage
### Added
- Official Event Data (`data/events.ts`).
- Floating Y2K Glass Navbar.
- Dreamy Sky Hero Section.
- Event Grid & Event Card.
- About, Timeline, and Sponsor Grid placeholders.
- Registration CTA section.
- Footer section.
- Completed full Homepage layout matching the SI FEST visual identity.

## [0.2.0] Design System
### Added
- Comprehensive CSS Variables for Colors, Radius, and Spacing.
- Glassmorphism System (Light, Medium, Strong).
- Y2K Floating Animation System (`animate-float`, `animate-pulse-glow`).
- Reusable UI Components: `Button`, `GlassCard`, `Badge`, `Input`, `Cloud`, `Bubble`, `Sparkle`, `Container`.
- Typography updated to `Fredoka` (Heading) for bubbly Y2K aesthetic.
- Design System Showcase page (`app/page.tsx`).

## [0.1.0]
### Added
- Initial Next.js project
- TypeScript
- Tailwind CSS
- App Router
- Project structure
- Initial performance foundation
- Initial documentation
