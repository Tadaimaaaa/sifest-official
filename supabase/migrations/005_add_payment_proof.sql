-- Menambahkan kolom payment_proof_url ke tabel registrations
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS payment_proof_url TEXT;
