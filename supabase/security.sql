-- Enable Row Level Security (RLS) for all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for PRODUCTS table
-- Allow everyone to read products
CREATE POLICY "Public Read Products" ON products
FOR SELECT USING (true);

-- Allow authenticated users (admin) to insert/update/delete products
CREATE POLICY "Admin Insert Products" ON products
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin Update Products" ON products
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin Delete Products" ON products
FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for TESTIMONIALS table
CREATE POLICY "Public Read Testimonials" ON testimonials
FOR SELECT USING (true);

CREATE POLICY "Admin Insert Testimonials" ON testimonials
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin Update Testimonials" ON testimonials
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin Delete Testimonials" ON testimonials
FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for CASE_STUDIES table
CREATE POLICY "Public Read Case Studies" ON case_studies
FOR SELECT USING (true);

CREATE POLICY "Admin Insert Case Studies" ON case_studies
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin Update Case Studies" ON case_studies
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin Delete Case Studies" ON case_studies
FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for SETTINGS table
CREATE POLICY "Public Read Settings" ON settings
FOR SELECT USING (true);

CREATE POLICY "Admin Insert Settings" ON settings
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin Update Settings" ON settings
FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policies for STORAGE (product-images bucket)
-- You need to create the bucket 'product-images' in Supabase Storage first

-- Allow public read access to storage
CREATE POLICY "Public Read Storage" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

-- Allow authenticated users to upload/update/delete files
CREATE POLICY "Admin Insert Storage" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Update Storage" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Delete Storage" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
