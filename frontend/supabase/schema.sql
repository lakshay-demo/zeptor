create table if not exists public.season2_registrations (
  id uuid primary key default gen_random_uuid(),
  team_name text not null,
  team_leader_name text not null,
  mobile_number text not null unique,
  created_at timestamptz not null default now(),
  status text not null default 'PENDING' check (status in ('PENDING', 'CONTACTED', 'CONFIRMED', 'REJECTED'))
);

create unique index if not exists season2_registrations_team_name_idx
  on public.season2_registrations (lower(team_name));

create or replace function public.enforce_season2_registration_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.season2_registrations) >= 48 then
    raise exception 'Season 2 registration limit reached';
  end if;
  return new;
end;
$$;

drop trigger if exists season2_registration_limit on public.season2_registrations;
create trigger season2_registration_limit
before insert on public.season2_registrations
for each row execute function public.enforce_season2_registration_limit();

alter table public.season2_registrations enable row level security;

create policy "Anyone can submit a Season 2 registration"
  on public.season2_registrations for insert
  to anon, authenticated
  with check (status = 'PENDING');

create policy "Admins can read Season 2 registrations"
  on public.season2_registrations for select
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can update Season 2 registrations"
  on public.season2_registrations for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check (status in ('PENDING', 'CONTACTED', 'CONFIRMED', 'REJECTED'));

alter publication supabase_realtime add table public.season2_registrations;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email)
  on conflict (id) do update set
    full_name = excluded.full_name,
    email = excluded.email,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin_user()
returns boolean
language sql
security definer
set search_path = public, auth
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

create policy "Admins can read all profiles"
on public.profiles for select
to authenticated
using (public.is_admin_user());