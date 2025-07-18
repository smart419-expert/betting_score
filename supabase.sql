create table pending_verifications (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text not null,
  password text not null, -- hashed!
  code text not null,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own profile
CREATE POLICY "Users can view own profile" ON users
FOR SELECT USING (auth.uid() = id);

-- Policy to allow users to update their own profile
CREATE POLICY "Users can update own profile" ON users
FOR UPDATE USING (auth.uid() = id);

-- Policy to allow insertion of new user profiles (for ensureUserProfile function)
CREATE POLICY "Users can insert own profile" ON users
FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy for storage bucket access (if not already set)
-- Allow authenticated users to upload to avatars bucket
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- Allow public read access to avatars
CREATE POLICY "Public read access for avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');