create table public.page_views (
  id uuid default gen_random_uuid() primary key,
  path text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.page_views enable row level security;

-- Create policy to allow insert from anyone (anonymous tracking)
create policy "Allow insert page_views for everyone" on public.page_views
  for insert with check (true);

-- Create policy to allow read for everyone
create policy "Allow read page_views for everyone" on public.page_views
  for select using (true);

-- Enable Realtime for page_views
alter publication supabase_realtime add table public.page_views;
