-- ClauseWand schema. Run once in the Supabase SQL editor (or via supabase db push).
create extension if not exists "pgcrypto";

-- Profiles ---------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  organization text,
  plan text not null default 'free' check (plan in ('free','solo','team','firm')),
  plan_status text not null default 'active' check (plan_status in ('active','pending','cancelled')),
  plan_renews_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Domain tables ----------------------------------------------------------
create table if not exists public.playbooks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  rules jsonb not null default '[]',   -- [{title, preferred, fallback, escalate}]
  created_at timestamptz not null default now()
);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  file_path text,
  source text not null default 'paste',
  status text not null default 'uploaded' check (status in ('uploaded','reviewed')),
  risk_score int,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  contract_id uuid not null references public.contracts(id) on delete cascade,
  playbook_id uuid references public.playbooks(id) on delete set null,
  result jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.drafts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  instructions text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.qa_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  contract_id uuid not null references public.contracts(id) on delete cascade,
  question text not null,
  answer jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.comparisons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  contract_id uuid not null references public.contracts(id) on delete cascade,
  position text not null,
  result jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.clause_library (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  contract_type text,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Usage metering (written only by the server with the service role) -------
create table if not exists public.usage_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('review','draft','ask','compare')),
  tokens int,
  created_at timestamptz not null default now()
);
create index if not exists usage_user_time on public.usage_events (user_id, created_at desc);

-- Payments (written only by webhook / admin with the service role) --------
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  email text not null,
  user_id uuid references auth.users(id) on delete set null,
  plan text not null,
  amount numeric,
  currency text,
  status text not null default 'confirmed',
  source text not null default 'webhook',
  raw jsonb,
  created_at timestamptz not null default now()
);

-- Public leads (insert via service role from API route) ------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  email text not null,
  name text, company text, role text, message text,
  created_at timestamptz not null default now()
);

-- Row Level Security -----------------------------------------------------
alter table public.profiles       enable row level security;
alter table public.playbooks      enable row level security;
alter table public.contracts      enable row level security;
alter table public.reviews        enable row level security;
alter table public.drafts         enable row level security;
alter table public.qa_messages    enable row level security;
alter table public.comparisons    enable row level security;
alter table public.clause_library enable row level security;
alter table public.notifications  enable row level security;
alter table public.usage_events   enable row level security;
alter table public.payments       enable row level security;
alter table public.leads          enable row level security;

create policy "profile read own"   on public.profiles for select using (auth.uid() = id);
create policy "profile update own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
-- users may change only their name/organization, never their plan
revoke update on public.profiles from authenticated, anon;
grant update (full_name, organization) on public.profiles to authenticated;

do $$
declare t text;
begin
  foreach t in array array['playbooks','contracts','reviews','drafts','qa_messages','comparisons','clause_library','notifications'] loop
    execute format('create policy "%1$s own select" on public.%1$s for select using (auth.uid() = user_id)', t);
    execute format('create policy "%1$s own insert" on public.%1$s for insert with check (auth.uid() = user_id)', t);
    execute format('create policy "%1$s own update" on public.%1$s for update using (auth.uid() = user_id) with check (auth.uid() = user_id)', t);
    execute format('create policy "%1$s own delete" on public.%1$s for delete using (auth.uid() = user_id)', t);
  end loop;
end $$;

create policy "usage read own"    on public.usage_events for select using (auth.uid() = user_id);
create policy "payments read own" on public.payments     for select using (auth.uid() = user_id);
-- leads: no policies, so only the service role can read or write.

-- Storage: private bucket, one folder per user -----------------------------
insert into storage.buckets (id, name, public) values ('contracts', 'contracts', false) on conflict do nothing;
create policy "contracts upload own" on storage.objects for insert to authenticated
  with check (bucket_id = 'contracts' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "contracts read own" on storage.objects for select to authenticated
  using (bucket_id = 'contracts' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "contracts delete own" on storage.objects for delete to authenticated
  using (bucket_id = 'contracts' and (storage.foldername(name))[1] = auth.uid()::text);
