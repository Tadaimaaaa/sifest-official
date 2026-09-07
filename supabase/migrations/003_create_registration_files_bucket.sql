-- Create registration_files bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('registration_files', 'registration_files', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow public inserts (uploads)
CREATE POLICY "Allow public uploads to registration_files" 
ON storage.objects FOR INSERT 
TO public 
WITH CHECK (bucket_id = 'registration_files');

-- Policy to allow public viewing of files
CREATE POLICY "Allow public viewing of registration_files" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'registration_files');
