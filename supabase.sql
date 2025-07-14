create table pending_verifications (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text not null,
  password text not null, -- hashed!
  code text not null,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);