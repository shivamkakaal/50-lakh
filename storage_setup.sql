-- 1. Create the storage bucket for selfies
INSERT INTO storage.buckets (id, name, public) 
VALUES ('donations', 'donations', true) 
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public to upload files to this bucket
CREATE POLICY "Allow public uploads to donations bucket" 
ON storage.objects FOR INSERT 
TO public 
WITH CHECK (bucket_id = 'donations');

-- 3. Allow public to view files in this bucket
CREATE POLICY "Allow public read from donations bucket" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'donations');
