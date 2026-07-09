-- Migration 7: Add image_url to tracks and make organization_id nullable
alter table public.tuk_hackathon_tracks add column if not exists image_url text;
alter table public.tuk_hackathon_tracks alter column organization_id drop not null;
