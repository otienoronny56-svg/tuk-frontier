-- Allow participants to read judge assignments for their project
create policy "Participants can view their assignments." on public.tuk_hackathon_judge_assignments for select using (
  exists (
    select 1 from public.tuk_hackathon_projects p
    join public.tuk_hackathon_team_members tm on p.team_id = tm.team_id
    where p.id = project_id and tm.user_id = auth.uid()
  )
);

-- Allow participants to read scores for their project
create policy "Participants can view their scores." on public.tuk_hackathon_scores for select using (
  exists (
    select 1 from public.tuk_hackathon_judge_assignments a
    join public.tuk_hackathon_projects p on a.project_id = p.id
    join public.tuk_hackathon_team_members tm on p.team_id = tm.team_id
    where a.id = assignment_id and tm.user_id = auth.uid()
  )
);
