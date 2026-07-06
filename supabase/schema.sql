-- Schéma des comptes membres La Coquette.
-- Tables : profiles (1 par utilisateur) + favorites. RLS activé partout :
-- chaque cliente ne peut lire/écrire que SES propres données.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles for select using (auth.uid() = id);
drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles for insert with check (auth.uid() = id);
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update using (auth.uid() = id);

-- Création automatique du profil à l'inscription.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $func$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$func$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  created_at timestamptz default now(),
  primary key (user_id, product_id)
);
alter table public.favorites enable row level security;
drop policy if exists favorites_select_own on public.favorites;
create policy favorites_select_own on public.favorites for select using (auth.uid() = user_id);
drop policy if exists favorites_insert_own on public.favorites;
create policy favorites_insert_own on public.favorites for insert with check (auth.uid() = user_id);
drop policy if exists favorites_delete_own on public.favorites;
create policy favorites_delete_own on public.favorites for delete using (auth.uid() = user_id);

-- Historique des commandes, relié au compte. Écrit côté serveur (après
-- vérification du paiement) avec la session de la cliente. RLS : lecture de
-- ses seules commandes.
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reference text,
  status text default 'paid',
  subtotal numeric,
  shipping numeric,
  discount numeric,
  total numeric not null,
  items jsonb not null default '[]',
  customer jsonb,
  created_at timestamptz default now()
);
alter table public.orders enable row level security;
drop policy if exists orders_select_own on public.orders;
create policy orders_select_own on public.orders for select using (auth.uid() = user_id);
drop policy if exists orders_insert_own on public.orders;
create policy orders_insert_own on public.orders for insert with check (auth.uid() = user_id);
create index if not exists orders_user_created_idx on public.orders (user_id, created_at desc);

-- Panier synchronisé entre appareils (1 par cliente).
create table if not exists public.carts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  items jsonb not null default '[]',
  updated_at timestamptz default now()
);
alter table public.carts enable row level security;
drop policy if exists carts_select_own on public.carts;
create policy carts_select_own on public.carts for select using (auth.uid() = user_id);
drop policy if exists carts_insert_own on public.carts;
create policy carts_insert_own on public.carts for insert with check (auth.uid() = user_id);
drop policy if exists carts_update_own on public.carts;
create policy carts_update_own on public.carts for update using (auth.uid() = user_id);
drop policy if exists carts_delete_own on public.carts;
create policy carts_delete_own on public.carts for delete using (auth.uid() = user_id);

-- Suppression de compte (RGPD, droit à l'effacement). La cliente connectée
-- supprime SON propre compte ; profil et favoris partent en cascade. Pas
-- besoin de la clé d'administration côté application.
create or replace function public.delete_current_user()
returns void language plpgsql security definer set search_path = public, auth as $del$
begin
  if auth.uid() is null then
    raise exception 'Non authentifié';
  end if;
  delete from auth.users where id = auth.uid();
end;
$del$;
revoke all on function public.delete_current_user() from public, anon;
grant execute on function public.delete_current_user() to authenticated;
