-- 009_create_event_brackets.sql

CREATE TABLE IF NOT EXISTS public.event_brackets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_slug TEXT NOT NULL UNIQUE,
    bracket_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Mengaktifkan RLS (Row Level Security)
ALTER TABLE public.event_brackets ENABLE ROW LEVEL SECURITY;

-- Policy untuk membaca (publik bisa melihat bracket, misalnya untuk halaman Live)
CREATE POLICY "Allow public read access on event_brackets"
ON public.event_brackets FOR SELECT
USING (true);

-- Policy untuk insert (Service Role / Admin)
CREATE POLICY "Allow admin to insert event_brackets"
ON public.event_brackets FOR INSERT
WITH CHECK (true);

-- Policy untuk update (Service Role / Admin)
CREATE POLICY "Allow admin to update event_brackets"
ON public.event_brackets FOR UPDATE
USING (true)
WITH CHECK (true);
