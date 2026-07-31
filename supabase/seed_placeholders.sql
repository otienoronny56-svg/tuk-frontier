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
  ('Geospatial & Earth Observation Innovation', 'GIS, remote sensing, satellite imagery, drone data, and spatial analytics for urban planning, disaster risk management, environmental monitoring, and climate adaptation. Anchored by KUZA–TUK.', 'Track Awards & Incubation', 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80'),
  ('Artificial Intelligence & Data Science', 'AI applications, machine learning models, NLP, computer vision, and data analytics for health, education, agriculture, finance, and public service delivery.', 'Track Awards & Incubation', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'),
  ('Smart Infrastructure & Built Environment', 'Smart buildings, structural health monitoring, BIM-enabled project management, smart construction tech, and sustainable energy integration. Anchored by ASA–TUK.', 'Track Awards & Incubation', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'),
  ('Climate Tech & Environmental Engineering', 'Clean energy, water resources management, carbon monitoring, green infrastructure, waste-to-energy, and sustainable agriculture solutions.', 'Track Awards & Incubation', 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80'),
  ('Health Technology & Bioinformatics', 'Medical device prototyping, telemedicine, health data analytics, disease surveillance, genomic data analysis, and AI-assisted diagnostics.', 'Track Awards & Incubation', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80'),
  ('Financial Technology & Digital Inclusion', 'Fintech for financial inclusion, digital payments, alternative credit scoring, SME financial services, and blockchain applications.', 'Track Awards & Incubation', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80');

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
