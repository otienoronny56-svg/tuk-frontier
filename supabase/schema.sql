-- TUK Frontier Hackathon Schema
-- Prefixing tables with "tuk_hackathon_" to avoid interference with existing projects

-- Enable UUID extension if not exists
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Extends Supabase Auth)
create table public.tuk_hackathon_profiles (
  id uuid references auth.users on delete cascade not null primary key,
  role text check (role in ('admin', 'organization', 'participant')) not null default 'participant',
  full_name text not null,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS
alter table public.tuk_hackathon_profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone." on public.tuk_hackathon_profiles
  for select using (true);

create policy "Users can insert their own profile." on public.tuk_hackathon_profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile." on public.tuk_hackathon_profiles
  for update using (auth.uid() = id);


-- 2. Organizations / Tracks Table
create table public.tuk_hackathon_tracks (
  id uuid default uuid_generate_v4() primary key,
  organization_id uuid references public.tuk_hackathon_profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  prize_pool text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tuk_hackathon_tracks enable row level security;
create policy "Tracks are viewable by everyone." on public.tuk_hackathon_tracks for select using (true);
create policy "Organizations can manage their own tracks." on public.tuk_hackathon_tracks for all using (auth.uid() = organization_id);
create policy "Admins can manage all tracks." on public.tuk_hackathon_tracks for all using (
  exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
);


-- 3. Teams Table
create table public.tuk_hackathon_teams (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  join_code text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tuk_hackathon_teams enable row level security;
create policy "Teams are viewable by everyone." on public.tuk_hackathon_teams for select using (true);
create policy "Participants can create teams." on public.tuk_hackathon_teams for insert with check (auth.uid() is not null);


-- 4. Team Members
create table public.tuk_hackathon_team_members (
  user_id uuid references public.tuk_hackathon_profiles(id) on delete cascade not null,
  team_id uuid references public.tuk_hackathon_teams(id) on delete cascade not null,
  role text check (role in ('leader', 'member')) not null default 'member',
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, team_id)
);

alter table public.tuk_hackathon_team_members enable row level security;
create policy "Team members are viewable by everyone." on public.tuk_hackathon_team_members for select using (true);
create policy "Users can join teams." on public.tuk_hackathon_team_members for insert with check (auth.uid() = user_id);
create policy "Users can leave teams." on public.tuk_hackathon_team_members for delete using (auth.uid() = user_id);


-- 5. Projects
create table public.tuk_hackathon_projects (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references public.tuk_hackathon_teams(id) on delete cascade not null unique,
  track_id uuid references public.tuk_hackathon_tracks(id) on delete set null,
  title text not null,
  abstract text not null,
  github_url text,
  video_url text,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tuk_hackathon_projects enable row level security;
create policy "Projects are viewable by everyone." on public.tuk_hackathon_projects for select using (true);
create policy "Users can insert projects." on public.tuk_hackathon_projects for insert with check (auth.uid() is not null);
create policy "Users can update projects." on public.tuk_hackathon_projects for update using (auth.uid() is not null);
