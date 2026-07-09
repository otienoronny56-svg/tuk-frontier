-- Migration 11: Add Delete Policy for Projects

-- Allow participants to delete (unsubmit) their projects
CREATE POLICY "Users can delete projects." ON public.tuk_hackathon_projects
FOR DELETE USING (auth.uid() IS NOT NULL);
