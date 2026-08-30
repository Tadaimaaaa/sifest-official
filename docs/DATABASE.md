# DATABASE ARCHITECTURE

*(PENTING: Seluruh entitas di bawah ini berstatus **PLANNED**. Database belum diimplementasikan dan tabel/migration belum dibuat.)*

## users (PLANNED)
- **Tujuan**: Menyimpan data autentikasi dan profil pengguna (admin, peserta).
- **Relasi**: 1-to-many ke `registrations`.

## events (IMPLEMENTED)
- **Tujuan**: Menyimpan daftar perlombaan dan kegiatan SI FEST (Futsal, E-Sport, Seminar, dll).
- **Status**: `registration_open` (BOOLEAN).
- **Relasi**: 1-to-many ke `registrations`.

## registrations (IMPLEMENTED)
- **Tujuan**: Mencatat pendaftaran suatu event oleh user.
- **Status**: PENDING, CONFIRMED, CANCELLED.
- **Relasi**: Belongs-to `events`, 1-to-many ke `participants`, has-one `transactions`.

## participants (IMPLEMENTED)
- **Tujuan**: Menyimpan detail peserta individu atau perwakilan institusi.
- **Relasi**: Belongs-to `registrations`.

## transactions (IMPLEMENTED)
- **Tujuan**: Struktur awal untuk mencatat tagihan dan nilai pembayaran. (Payment Gateway belum aktif).
- **Status**: PENDING, PAID, EXPIRED, FAILED, CANCELLED.
- **Relasi**: Belongs-to `registrations`.

## payment_webhook_logs (IMPLEMENTED)
- **Tujuan**: Menampung payload webhook dari Payment Provider di masa depan.

## news (PLANNED)
- **Tujuan**: Menyimpan berita/pengumuman SI FEST.

## sponsors (PLANNED)
- **Tujuan**: Menyimpan data sponsor dan media partner untuk ditampilkan.

## gallery (PLANNED)
- **Tujuan**: Menyimpan dokumentasi kegiatan.
