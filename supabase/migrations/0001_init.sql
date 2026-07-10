-- AVE — schéma initial (voir docs/ARCHITECTURE.md §7 pour le détail)
create extension if not exists pgcrypto;

create table user_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  university text,
  field_of_study text,
  campus text,
  city text default 'Aix-en-Provence',
  push_subscription jsonb,
  created_at timestamptz default now()
);

create table event_categories (
  id serial primary key,
  slug text unique not null,
  label text not null,
  icon text
);

create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category_id int references event_categories(id),
  cover_url text,
  gallery jsonb default '[]',
  starts_at timestamptz not null,
  ends_at timestamptz,
  address text,
  lat double precision,
  lng double precision,
  is_free boolean default true,
  price_cents int default 0,
  capacity int,
  seats_taken int default 0,
  organizer_name text,
  organizer_id uuid references user_profile(id),
  status text default 'published' check (status in ('draft', 'published', 'cancelled')),
  created_at timestamptz default now()
);

create table event_tickets (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  user_id uuid references user_profile(id) on delete cascade,
  qr_code text unique not null,
  status text default 'confirmed' check (status in ('confirmed', 'cancelled', 'used')),
  purchased_at timestamptz default now(),
  unique (event_id, user_id)
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references event_tickets(id) on delete cascade,
  stripe_payment_intent_id text unique,
  amount_cents int not null,
  currency text default 'eur',
  method text,
  status text default 'pending' check (status in ('pending', 'succeeded', 'failed', 'refunded')),
  created_at timestamptz default now()
);

create table news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  source text check (source in ('university', 'association', 'bde', 'city')),
  cover_url text,
  published_at timestamptz default now()
);

create table partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  description text,
  discount_label text,
  logo_url text,
  address text,
  lat double precision,
  lng double precision
);

create table assistance_categories (
  id serial primary key,
  slug text unique not null,
  label text not null,
  icon text,
  color text,
  sort_order int default 0
);

create table assistance_items (
  id uuid primary key default gen_random_uuid(),
  category_id int references assistance_categories(id) on delete cascade,
  type text not null check (type in ('app', 'aide', 'contact', 'lieu', 'info')),
  title text not null,
  subtitle text,
  description text,
  logo_url text,
  phone text,
  amount_label text,
  conditions text,
  documents jsonb default '[]',
  faq jsonb default '[]',
  official_url text,
  download_ios_url text,
  download_android_url text,
  address text,
  lat double precision,
  lng double precision,
  opening_hours jsonb,
  sort_order int default 0
);

create table favorites (
  user_id uuid references user_profile(id) on delete cascade,
  target_type text not null check (target_type in ('event', 'assistance_item', 'partner')),
  target_id uuid not null,
  created_at timestamptz default now(),
  primary key (user_id, target_type, target_id)
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references user_profile(id) on delete cascade,
  title text not null,
  body text,
  deep_link text,
  read_at timestamptz,
  created_at timestamptz default now()
);

-- Row Level Security ----------------------------------------------------

alter table user_profile enable row level security;
alter table events enable row level security;
alter table event_categories enable row level security;
alter table event_tickets enable row level security;
alter table payments enable row level security;
alter table news enable row level security;
alter table partners enable row level security;
alter table assistance_categories enable row level security;
alter table assistance_items enable row level security;
alter table favorites enable row level security;
alter table notifications enable row level security;

-- Lecture publique du contenu éditorial
create policy "public read events" on events for select using (status = 'published');
create policy "public read event_categories" on event_categories for select using (true);
create policy "public read news" on news for select using (true);
create policy "public read partners" on partners for select using (true);
create policy "public read assistance_categories" on assistance_categories for select using (true);
create policy "public read assistance_items" on assistance_items for select using (true);

-- Données strictement personnelles
create policy "own profile" on user_profile for all using (auth.uid() = id);
create policy "own tickets" on event_tickets for all using (auth.uid() = user_id);
create policy "own favorites" on favorites for all using (auth.uid() = user_id);
create policy "own notifications" on notifications for all using (auth.uid() = user_id);

-- Paiements : lecture par le propriétaire du billet, écriture réservée au service role (webhook)
create policy "read own payments" on payments for select using (
  exists (
    select 1 from event_tickets
    where event_tickets.id = payments.ticket_id
    and event_tickets.user_id = auth.uid()
  )
);
