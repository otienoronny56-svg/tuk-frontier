-- Migration 8: Add pitch_deck_url to projects
alter table public.tuk_hackathon_projects add column if not exists pitch_deck_url text;
