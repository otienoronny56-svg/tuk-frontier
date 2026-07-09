-- Migration 12: Add submitted_by to projects

ALTER TABLE public.tuk_hackathon_projects
ADD COLUMN IF NOT EXISTS submitted_by uuid REFERENCES public.tuk_hackathon_profiles(id) ON DELETE SET NULL;
