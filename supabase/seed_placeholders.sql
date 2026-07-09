-- Migration 9: Ensure Sponsors table exists, update Tracks and Projects schemas, and Seed Placeholders

-- 1. Ensure sponsors table and its policies exist (from Migration 6)
create table if not exists public.tuk_hackathon_sponsors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  tier text check (tier in ('Silver', 'Gold', 'Platinum', 'Custom')) not null,
  website_url text,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tuk_hackathon_sponsors enable row level security;

drop policy if exists "Sponsors are viewable by everyone." on public.tuk_hackathon_sponsors;
create policy "Sponsors are viewable by everyone." on public.tuk_hackathon_sponsors for select using (true);

drop policy if exists "Admins can manage sponsors." on public.tuk_hackathon_sponsors;
create policy "Admins can manage sponsors." on public.tuk_hackathon_sponsors for all using (
  exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
);

-- 2. Ensure Track columns and drop NOT NULL (from Migration 7)
alter table public.tuk_hackathon_tracks add column if not exists image_url text;
alter table public.tuk_hackathon_tracks alter column organization_id drop not null;

-- 3. Ensure Project pitch deck column exists (from Migration 8)
alter table public.tuk_hackathon_projects add column if not exists pitch_deck_url text;

-- 3.1. Create Contact Messages table
create table if not exists public.tuk_hackathon_contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tuk_hackathon_contact_messages enable row level security;

drop policy if exists "Anyone can submit contact messages." on public.tuk_hackathon_contact_messages;
create policy "Anyone can submit contact messages." on public.tuk_hackathon_contact_messages for insert with check (true);

drop policy if exists "Admins can view contact messages." on public.tuk_hackathon_contact_messages;
create policy "Admins can view contact messages." on public.tuk_hackathon_contact_messages for select using (
  exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
);

-- 4. Seed Tracks
insert into public.tuk_hackathon_tracks (title, description, prize_pool, image_url)
values 
  ('Cyber Security & Threat Intel', 'Develop solutions for real-time threat intelligence, secure authentication, zero-trust architectures, and data privacy preservation.', 'KSh 1,500,000 Prize Pool', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80'),
  ('HealthTech & Telemedicine', 'Build remote diagnostics pipelines, clinical assistance bots, patient tracking tools, and AI medical analysis apps.', 'KSh 1,200,000 Prize Pool', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80'),
  ('Smart Cities & Mobility', 'Optimize urban transport, track traffic flows, design smart energy grid models, or plan public waste management networks.', 'KSh 1,000,000 Prize Pool', 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=600&q=80'),
  ('AgriTech & Smart Farming', 'Build offline-first dashboards for local crop disease detection, weather modeling, or supply chain distribution mapping.', 'KSh 1,500,000 Prize Pool', 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80'),
  ('EduTech & Gamified Learning', 'Create interactive virtual classroom plugins, gamified programming lessons, or adaptive language translation models.', 'KSh 1,000,000 Prize Pool', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80');

-- 5. Seed Mentors (TUK Hackathon People)
insert into public.tuk_hackathon_people (name, role, company, type, avatar_url)
values
  ('Alice Johnson', 'Senior Security Architect', 'Cloudflare', 'Mentor', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'),
  ('Robert Chen', 'Principal Applied AI Engineer', 'OpenAI', 'Mentor', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'),
  ('Diana Prince', 'Director of Product', 'Google', 'Mentor', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80'),
  ('Marcus Aurelius', 'VP of Core Infrastructure', 'Meta', 'Mentor', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'),
  ('Sophia Loren', 'Lead iOS Engineer', 'Spotify', 'Mentor', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80');

-- 6. Seed Sponsors
insert into public.tuk_hackathon_sponsors (name, tier, website_url, logo_url)
values
  ('Google Cloud', 'Platinum', 'https://cloud.google.com', 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-ar21.svg'),
  ('Safaricom PLC', 'Platinum', 'https://safaricom.co.ke', 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Safaricom_logo.svg'),
  ('Amazon Web Services', 'Gold', 'https://aws.amazon.com', 'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-ar21.svg'),
  ('Microsoft East Africa', 'Gold', 'https://microsoft.com', 'https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg'),
  ('Github', 'Silver', 'https://github.com', 'https://www.vectorlogo.zone/logos/github/github-ar21.svg');
