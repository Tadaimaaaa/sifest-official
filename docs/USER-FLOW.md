# USER FLOW

## Visitor

```text
Home (Homepage SI FEST)
 ↓
Explore Event (Event Grid Section)
 ↓
Event Detail (/events/[slug])
 ↓
Registration (/registration)
```

## Participant

```text
Event Detail
 ↓
Registration (/registration)
 ↓
Event Selection (Jika tidak membawa URL query)
 ↓
Isi Data Peserta (Validasi Client-Side)
 ↓
Review Pendaftaran
 ↓
Server Validation (Registration Action)
 ↓
Supabase Database
 ↓
Registration Confirmed (Menampilkan Kode Pendaftaran)
 ↓
Payment [NEXT PHASE]
 ↓
Payment Verification
 ↓
Registration Confirmed
```

## Admin

*(PENTING: Flow ini berstatus **PLANNED**. Akan dirancang pada tahap berikutnya.)*

```text
Login
 ↓
Dashboard
 ↓
Manage Events / Users / Registrations / Transactions
```
