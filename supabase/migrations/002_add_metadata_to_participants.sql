-- 002_add_metadata_to_participants.sql
-- Add metadata JSONB column to participants table
ALTER TABLE participants ADD COLUMN metadata JSONB;

-- Drop and recreate the RPC to accept metadata
DROP FUNCTION IF EXISTS create_registration_flow(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS create_registration_flow(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB);

CREATE OR REPLACE FUNCTION create_registration_flow(
    p_event_slug TEXT,
    p_registration_code TEXT,
    p_full_name TEXT,
    p_email TEXT,
    p_whatsapp TEXT,
    p_institution TEXT,
    p_metadata JSONB DEFAULT NULL
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
    INSERT INTO participants (registration_id, full_name, email, whatsapp, institution, metadata)
    VALUES (v_registration_id, p_full_name, p_email, p_whatsapp, p_institution, p_metadata);

    -- 4. Return success
    RETURN json_build_object(
        'success', true,
        'registration_id', v_registration_id,
        'registration_code', p_registration_code
    )::jsonb;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Registration failed: %', SQLERRM;
END;
$$;
