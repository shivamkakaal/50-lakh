-- Run this in your Supabase SQL Editor to fix the Selfie Upload and Payment Callback

-- 1. Check if the policy exists and drop it if it does (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public update on donations" ON public.donations;

-- 2. Create a policy that allows the frontend and API routes to update the donation record
-- This allows setting the selfie_url and updating the state to 'success'
CREATE POLICY "Allow public update on donations" 
ON public.donations 
FOR UPDATE 
TO public 
USING (true)
WITH CHECK (true);

-- Note: In a production environment with strict security, you would ideally use a 
-- Supabase Service Role Key in your API routes to bypass RLS instead of making the table 
-- fully updatable by the public. But for this MVP, this ensures the selfie and state updates work.
