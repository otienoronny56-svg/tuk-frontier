-- Migration 13: Add submission status to projects

ALTER TABLE public.tuk_hackathon_projects
ADD COLUMN IF NOT EXISTS status text CHECK (status IN ('draft', 'submitted')) NOT NULL DEFAULT 'submitted';
