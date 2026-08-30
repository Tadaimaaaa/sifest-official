-- 001_initial_schema.sql
-- Extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. EVENTS TABLE
-- ==========================================
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    date DATE,
    location TEXT,
    price TEXT,
    registration_open BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial event data from data/events.ts
INSERT INTO events (slug, name, category, description, location, price, registration_open) VALUES
('seminar-nasional', 'Seminar Nasional Teknologi Y2K', 'Seminar', 'Seminar membahas perkembangan teknologi menuju era Nostalgic Utopia.', 'UPI Convention Center', 'Rp 50.000', true),
('turnamen-futsal', 'Futsal Championship SI FEST', 'Kompetisi', 'Turnamen futsal antar mahasiswa se-Sumatera Barat.', 'Lapangan Futsal UPI YPTK', 'Rp 250.000 / Tim', true),
('turnamen-esport-mlbb', 'Mobile Legends E-Sport Arena', 'E-Sport', 'Turnamen Mobile Legends Bang Bang tingkat nasional.', 'Online & UPI Convention Center', 'Rp 100.000 / Tim', true),
('lomba-keagamaan', 'MTQ & Lomba Keagamaan', 'Religi', 'Lomba MTQ dan kegiatan keagamaan antar mahasiswa.', 'Masjid Raya UPI YPTK', 'Gratis', true),
('open-bazaar', 'Y2K Open Bazaar', 'Bazaar', 'Bazaar makanan, minuman, dan thrift shop dengan nuansa Y2K.', 'Plaza UPI YPTK', 'Menyusul', true)
ON CONFLICT (slug) DO NOTHING;

-- ==========================================
-- 2. REGISTRATIONS TABLE
-- ==========================================
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE RESTRICT,
    registration_code TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. PARTICIPANTS TABLE
-- ==========================================
CREATE TABLE participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    institution TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. TRANSACTIONS TABLE
-- ==========================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    amount NUMERIC(12,2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('PENDING', 'PAID', 'EXPIRED', 'FAILED', 'CANCELLED')),
    payment_method TEXT,
    provider TEXT,
    provider_transaction_id TEXT,
    expires_at TIMESTAMPTZ,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 5. PAYMENT WEBHOOK LOGS TABLE
-- ==========================================
CREATE TABLE payment_webhook_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID, -- Optional, as some webhooks might fail to map to a transaction
    provider TEXT,
    event_type TEXT,
    payload JSONB,
    processed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- INDEXES
-- ==========================================
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_registrations_code ON registrations(registration_code);
CREATE INDEX idx_registrations_event_id ON registrations(event_id);
CREATE INDEX idx_participants_registration_id ON participants(registration_id);
CREATE INDEX idx_participants_email ON participants(email);
CREATE INDEX idx_transactions_registration_id ON transactions(registration_id);
CREATE INDEX idx_transactions_provider_id ON transactions(provider_transaction_id);
CREATE INDEX idx_transactions_status ON transactions(status);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_webhook_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to events
CREATE POLICY "Allow public read access to events" ON events FOR SELECT USING (true);

-- No public policies for registrations, participants, transactions, or logs.
-- All operations will be handled server-side using the Service Role Key.

-- ==========================================
-- RPC FUNCTION: ATOMIC REGISTRATION
-- ==========================================
-- This function ensures that a registration and its participant data are inserted atomically.
CREATE OR REPLACE FUNCTION create_registration_flow(
    p_event_slug TEXT,
    p_registration_code TEXT,
    p_full_name TEXT,
    p_email TEXT,
    p_whatsapp TEXT,
    p_institution TEXT
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_event_id UUID;
    v_registration_id UUID;
    v_registration_open BOOLEAN;
BEGIN
    -- 1. Validate event exists and is open
    SELECT id, registration_open INTO v_event_id, v_registration_open 
    FROM events 
    WHERE slug = p_event_slug;

    IF v_event_id IS NULL THEN
        RAISE EXCEPTION 'Event not found.';
    END IF;

    IF v_registration_open = false THEN
        RAISE EXCEPTION 'Registration is closed for this event.';
    END IF;

    -- 2. Insert Registration
    INSERT INTO registrations (event_id, registration_code, status)
    VALUES (v_event_id, p_registration_code, 'PENDING')
    RETURNING id INTO v_registration_id;

    -- 3. Insert Participant
    INSERT INTO participants (registration_id, full_name, email, whatsapp, institution)
    VALUES (v_registration_id, p_full_name, p_email, p_whatsapp, p_institution);

    -- 4. Return success
    RETURN json_build_object(
        'success', true,
        'registration_id', v_registration_id,
        'registration_code', p_registration_code
    )::jsonb;
EXCEPTION
    WHEN OTHERS THEN
        -- PostgreSQL automatically rolls back the transaction on exception
        -- We re-raise the error so the client knows it failed
        RAISE EXCEPTION 'Registration failed: %', SQLERRM;
END;
$$;
