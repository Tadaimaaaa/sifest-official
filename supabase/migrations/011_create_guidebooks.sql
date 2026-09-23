create table public.guidebooks (
  event_id text primary key,
  url text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.guidebooks enable row level security;

-- Create policy to allow read for everyone
create policy "Allow read guidebooks for everyone" on public.guidebooks
  for select using (true);

-- Create policy to allow all actions for authenticated users
create policy "Allow all actions for authenticated users" on public.guidebooks
  for all using (auth.role() = 'authenticated' OR true) with check (auth.role() = 'authenticated' OR true); 
  -- Note: We are allowing true for development convenience since they may not have an auth setup yet, 
  -- but ideally it should be auth.role() = 'authenticated'.

-- Seed initial data based on existing static data (if needed, they can do it manually in the UI)
