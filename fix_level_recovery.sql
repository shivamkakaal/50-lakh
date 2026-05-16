-- Run this in your Supabase SQL Editor to allow Level Recovery by public users (MVP)

-- 1. Drop existing policy if it exists to avoid conflict
DROP POLICY IF EXISTS "Allow public update on levels" ON public.levels;

-- 2. Create policy allowing anyone to update the levels table
-- In a real production app, this should be an Admin-only action or verified via a secure API route,
-- but for this interactive MVP where any user can trigger 'Extend' or 'Restart', this allows the UI to work.
CREATE POLICY "Allow public update on levels" 
ON public.levels 
FOR UPDATE 
TO public 
USING (true)
WITH CHECK (true);
