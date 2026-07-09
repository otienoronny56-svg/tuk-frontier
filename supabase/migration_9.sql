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

-- 7. Create Blogs Table & Seed
create table if not exists public.tuk_hackathon_blogs (
  id serial primary key,
  title text not null,
  excerpt text not null,
  summary text not null,
  content text not null,
  author text not null,
  category text not null,
  views text not null default '0 reads',
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tuk_hackathon_blogs enable row level security;

drop policy if exists "Blogs are viewable by everyone." on public.tuk_hackathon_blogs;
create policy "Blogs are viewable by everyone." on public.tuk_hackathon_blogs for select using (true);

drop policy if exists "Admins can manage blogs." on public.tuk_hackathon_blogs;
create policy "Admins can manage blogs." on public.tuk_hackathon_blogs for all using (
  exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
);

insert into public.tuk_hackathon_blogs (title, excerpt, summary, content, author, category, views, image_url) values
  ('Co-Building the Future: Why Hackathons are the Digital Lifeblood of Tech Hubs', 
   'Exploring how hands-on student competitions are bridging the gap between classroom theory and industry-grade engineering.', 
   'A deep dive into how collaborative coding hubs and intense sprint-based competitions are stimulating local student talent across Nairobi''s universities.',
   '<p>For years, classical classroom learning was the main source of student training. Today, the rise of student hackathons is bridging the gap, connecting passionate programmers, designers, and innovators directly with real-world developer tools and sponsor mentorship.</p><h3>Why Hackathons Matter</h3><p>An intense, focused build phase isn''t just about winning cash prizes; it''s about developing real engineering skills under tight deadlines. Working with modern APIs, deploying live databases, and pitching to venture capitalists gives hackers industry-grade experience.</p><p>By bringing these competitive formats directly to university departments, we are accelerating tech adoption, promoting peer-to-peer mentoring, and giving student builders the tools to turn code into real-world applications.</p>',
   'Ronny Winstone', 'Innovation', '1,248 reads', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'),
  ('5 Pro-Tips to Maximize Your Hackathon Project''s Score',
   'Simple yet highly effective steps to ensure your project demo stands out, impresses judges, and matches criteria.',
   'Proven strategies from past winners on how to scope your MVP, prepare your pitch decks, and present flawless user demos.',
   '<p>Are you struggling to scope your MVP under the 48-hour deadline? Many teams fail because they spend too much time building complex logic instead of securing a flawless user flow. We recommend focusing on a single killer feature, mocking secondary API responses, and reserving the final 4 hours exclusively for presentation practice.</p><p>At TUK Frontier, our goal is to empower student developers to ship stable, viable, and impactful solutions. Scoping correctly ensures your team presents a working, polished project that judges can immediately appreciate.</p><p>Remember: a working prototype with a clear value proposition always beats a massive unfinished architecture with no functional UI.</p>',
   'Sarah Wanjiku', 'Guides', '842 reads', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'),
  ('Empowering Student Founders: The Venture Capital Advantage',
   'How TUK Frontier Hackathon is helping student startups scale beyond the competition with seed funding.',
   'A guide to understanding pitch requirements, business models, and securing investor support during the closing pitches.',
   '<h3>Demos vs. Scalable Business Models</h3><p>Building a working app is just the beginning. Judges and sponsors evaluate how your solution fits the local market. With the right business model and target audience identification, your hackathon prototype can turn into a venture-backed student startup.</p><h3>Sustaining Student Tech Ecosystems</h3><p>By connecting student innovators directly with incubator leads and VC networks, we are stimulating local job creation and helping student founders transition their projects into viable products.</p>',
   'Marcus Otieno', 'Business', '521 reads', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80')
on conflict do nothing;

-- Add is_suspended to teams table
alter table public.tuk_hackathon_teams add column if not exists is_suspended boolean default false not null;
