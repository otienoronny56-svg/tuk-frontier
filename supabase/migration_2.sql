-- Migration 2: CMS and Dynamic Content

-- 1. People (Mentors & Judges)
create table public.tuk_hackathon_people (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  company text not null,
  type text check (type in ('Mentor', 'Judge')) not null,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tuk_hackathon_people enable row level security;
create policy "People are viewable by everyone." on public.tuk_hackathon_people for select using (true);
create policy "Admins can manage people." on public.tuk_hackathon_people for all using (
  exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
);

-- 2. Sponsor Inquiries
create table public.tuk_hackathon_sponsor_inquiries (
  id uuid default uuid_generate_v4() primary key,
  company_name text not null,
  contact_name text not null,
  email text not null,
  tier text check (tier in ('Silver', 'Gold', 'Platinum', 'Custom')) not null,
  message text,
  status text check (status in ('Pending', 'Contacted', 'Approved', 'Rejected')) not null default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tuk_hackathon_sponsor_inquiries enable row level security;
-- Anyone can insert an inquiry
create policy "Anyone can submit inquiries." on public.tuk_hackathon_sponsor_inquiries for insert with check (true);
-- Only admins can view/manage inquiries
create policy "Admins can manage inquiries." on public.tuk_hackathon_sponsor_inquiries for all using (
  exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
);

-- 3. Dynamic Content (CMS)
create table public.tuk_hackathon_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tuk_hackathon_content enable row level security;
create policy "Content is viewable by everyone." on public.tuk_hackathon_content for select using (true);
create policy "Admins can manage content." on public.tuk_hackathon_content for all using (
  exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
);

-- Insert Default Content
insert into public.tuk_hackathon_content (key, value) values
('faqs', '[]'::jsonb),
('schedule', '[]'::jsonb),
('rules', '[]'::jsonb)
on conflict (key) do nothing;
