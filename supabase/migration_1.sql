-- Migration 1: Add Pitch Deck URL and Setup Storage

-- 1. Add pitch_deck_url to projects table
-- Note: If you already ran this part successfully, you might get an error that the column already exists.
-- You can safely ignore that error, or comment out the ALTER TABLE lines.
ALTER TABLE public.tuk_hackathon_projects
ADD COLUMN IF NOT EXISTS pitch_deck_url text;

-- 2. Create the Storage Bucket for hackathon files
INSERT INTO storage.buckets (id, name, public)
VALUES ('hackathon_files', 'hackathon_files', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Set up Storage RLS Policies (Using unique names to avoid conflicts)

-- Allow public access to read files
CREATE POLICY "Hackathon Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'hackathon_files' );

-- Allow authenticated users to upload files
CREATE POLICY "Hackathon Authenticated Uploads"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'hackathon_files' 
  AND auth.role() = 'authenticated'
);

-- Allow users to update/delete their own uploads
CREATE POLICY "Hackathon Update Own Files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'hackathon_files'
  AND auth.uid() = owner
);

CREATE POLICY "Hackathon Delete Own Files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'hackathon_files'
  AND auth.uid() = owner
);
