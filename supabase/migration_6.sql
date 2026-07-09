-- Migration 6: Confirmed Sponsors

create table public.tuk_hackathon_sponsors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  tier text check (tier in ('Silver', 'Gold', 'Platinum', 'Custom')) not null,
  website_url text,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tuk_hackathon_sponsors enable row level security;

-- Anyone can view sponsors
create policy "Sponsors are viewable by everyone." on public.tuk_hackathon_sponsors for select using (true);

-- Only admins can manage sponsors
create policy "Admins can manage sponsors." on public.tuk_hackathon_sponsors for all using (
  exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
);
