-- Migration 3: Supabase Storage for Gallery Images

-- 1. Insert the Storage Bucket
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- 2. Setup Storage Policies
-- Allow anyone to view/download images (since the bucket is public)
create policy "Gallery images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'gallery' );

-- Allow authenticated admins to insert images
create policy "Admins can upload gallery images."
  on storage.objects for insert
  with check (
    bucket_id = 'gallery' and 
    exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
  );

-- Allow authenticated admins to update images
create policy "Admins can update gallery images."
  on storage.objects for update
  using (
    bucket_id = 'gallery' and 
    exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
  );

-- Allow authenticated admins to delete images
create policy "Admins can delete gallery images."
  on storage.objects for delete
  using (
    bucket_id = 'gallery' and 
    exists (select 1 from public.tuk_hackathon_profiles where id = auth.uid() and role = 'admin')
  );
