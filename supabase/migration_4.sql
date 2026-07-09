-- Migration 4: Judge Portal & Scoring System

-- 1. Update Profiles to allow 'judge' role
ALTER TABLE public.tuk_hackathon_profiles 
DROP CONSTRAINT IF EXISTS tuk_hackathon_profiles_role_check;

ALTER TABLE public.tuk_hackathon_profiles 
ADD CONSTRAINT tuk_hackathon_profiles_role_check 
CHECK (role in ('admin', 'organization', 'participant', 'judge'));

-- Allow admins to update user roles
create policy "Admins can update all profiles." on public.tuk_hackathon_profiles for update using (
  exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
);

-- 2. Judge Assignments
create table public.tuk_hackathon_judge_assignments (
  id uuid default uuid_generate_v4() primary key,
  judge_id uuid references public.tuk_hackathon_profiles(id) on delete cascade not null,
  project_id uuid references public.tuk_hackathon_projects(id) on delete cascade not null,
  status text check (status in ('assigned', 'scored')) not null default 'assigned',
  assigned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(judge_id, project_id) -- A judge can only be assigned to a project once
);

alter table public.tuk_hackathon_judge_assignments enable row level security;
-- Admins can manage all assignments
create policy "Admins can manage assignments." on public.tuk_hackathon_judge_assignments for all using (
  exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
);
-- Judges can view their own assignments
create policy "Judges can view their assignments." on public.tuk_hackathon_judge_assignments for select using (
  auth.uid() = judge_id
);
-- Judges can update the status of their own assignments
create policy "Judges can update their assignment status." on public.tuk_hackathon_judge_assignments for update using (
  auth.uid() = judge_id
);


-- 3. Scores Table
create table public.tuk_hackathon_scores (
  id uuid default uuid_generate_v4() primary key,
  assignment_id uuid references public.tuk_hackathon_judge_assignments(id) on delete cascade not null unique,
  innovation_score integer check (innovation_score between 1 and 10) not null,
  technical_score integer check (technical_score between 1 and 10) not null,
  impact_score integer check (impact_score between 1 and 10) not null,
  feedback text,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tuk_hackathon_scores enable row level security;
-- Admins can view all scores
create policy "Admins can view all scores." on public.tuk_hackathon_scores for select using (
  exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
);
-- Judges can insert/update/view their own scores
create policy "Judges can manage their own scores." on public.tuk_hackathon_scores for all using (
  exists (
    select 1 from public.tuk_hackathon_judge_assignments 
    where id = assignment_id and judge_id = auth.uid()
  )
);
