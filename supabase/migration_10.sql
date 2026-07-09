-- Migration 10: Add email and phone to profiles

ALTER TABLE public.tuk_hackathon_profiles
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS phone text;

-- Backfill email from auth.users for existing profiles
UPDATE public.tuk_hackathon_profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND p.email IS NULL;
