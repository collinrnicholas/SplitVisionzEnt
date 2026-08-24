-- Split Vizions — leads table
-- Run this in Supabase SQL Editor (or via a migration). Creates the table the
-- /api/leads route writes to. Safe to re-run (CREATE ... IF NOT EXISTS).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  contact text not null,
  kind text,
  style text,
  placement text,
  timing text,
  source text default 'split-visionz-chat',
  created_at timestamptz not null default now()
);

-- Row Level Security: the /api/leads route uses the service role key, which
-- bypasses RLS. But if you ever switch to the anon key you'd need a policy.
alter table public.leads enable row level security;

-- Sensible default indexes for querying later.
create index if not exists leads_contact_idx on public.leads (contact);
create index if not exists leads_created_idx on public.leads (created_at desc);
