-- FleetFlow operational schema
-- This migration is intentionally idempotent so it can be applied safely more than once.

create table if not exists public.products (
  id text primary key,
  name text not null,
  brand text not null,
  code text not null unique,
  category text not null,
  package_size text not null,
  unit text not null,
  batch text not null,
  expiry date not null,
  reorder_level integer not null default 0 check (reorder_level >= 0),
  image text not null default '🥤'
);

create table if not exists public.inventory (
  id text primary key,
  product_id text not null references public.products(id) on update cascade on delete cascade,
  opening integer not null default 0 check (opening >= 0),
  incoming integer not null default 0 check (incoming >= 0),
  outgoing integer not null default 0 check (outgoing >= 0),
  damaged integer not null default 0 check (damaged >= 0),
  reserved integer not null default 0 check (reserved >= 0),
  available integer not null default 0 check (available >= 0),
  location text not null,
  last_updated text not null
);

create table if not exists public.shipments (
  id text primary key,
  supplier text not null,
  driver text not null,
  vehicle text not null,
  arrival text not null,
  expected integer not null default 0 check (expected >= 0),
  received integer not null default 0 check (received >= 0),
  damaged integer not null default 0 check (damaged >= 0),
  status text not null,
  qr text not null unique
);

create table if not exists public.dispatches (
  id text primary key,
  marketer text not null,
  product text not null,
  quantity integer not null default 0 check (quantity >= 0),
  vehicle text not null,
  driver text not null,
  dispatched text not null,
  destination text not null,
  status text not null
);

create table if not exists public.orders (
  id text primary key,
  marketer text not null,
  items integer not null default 0 check (items >= 0),
  amount numeric(14, 2) not null default 0 check (amount >= 0),
  created text not null,
  delivery text not null,
  status text not null,
  priority text not null
);

create table if not exists public.vehicles (
  id text primary key,
  registration text not null unique,
  type text not null,
  driver text not null,
  capacity text not null,
  status text not null,
  trips integer not null default 0 check (trips >= 0),
  maintenance text not null,
  location text not null,
  eta text not null
);

create table if not exists public.drivers (
  id text primary key,
  name text not null,
  phone text not null,
  license text not null,
  vehicle text not null,
  trips integer not null default 0 check (trips >= 0),
  deliveries integer not null default 0 check (deliveries >= 0),
  rating numeric(3, 2) not null default 0 check (rating >= 0 and rating <= 5),
  status text not null,
  avatar text not null
);

create table if not exists public.marketers (
  id text primary key,
  name text not null,
  phone text not null,
  area text not null,
  orders integer not null default 0 check (orders >= 0),
  revenue numeric(14, 2) not null default 0 check (revenue >= 0),
  status text not null,
  avatar text not null
);

create index if not exists inventory_product_id_idx on public.inventory(product_id);
create index if not exists shipments_status_idx on public.shipments(status);
create index if not exists dispatches_status_idx on public.dispatches(status);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists vehicles_status_idx on public.vehicles(status);
create index if not exists drivers_status_idx on public.drivers(status);
create index if not exists marketers_status_idx on public.marketers(status);

-- FleetFlow currently has no sign-in screen, so the demo can use the anon key safely for
-- this operational prototype. Add authenticated policies and remove anon write policies
-- before putting a production warehouse behind the public client.
alter table public.products enable row level security;
alter table public.inventory enable row level security;
alter table public.shipments enable row level security;
alter table public.dispatches enable row level security;
alter table public.orders enable row level security;
alter table public.vehicles enable row level security;
alter table public.drivers enable row level security;
alter table public.marketers enable row level security;

do $$
begin
  create policy "FleetFlow public read products" on public.products for select to anon, authenticated using (true);
  create policy "FleetFlow public write products" on public.products for all to anon, authenticated using (true) with check (true);
  create policy "FleetFlow public read inventory" on public.inventory for select to anon, authenticated using (true);
  create policy "FleetFlow public write inventory" on public.inventory for all to anon, authenticated using (true) with check (true);
  create policy "FleetFlow public read shipments" on public.shipments for select to anon, authenticated using (true);
  create policy "FleetFlow public write shipments" on public.shipments for all to anon, authenticated using (true) with check (true);
  create policy "FleetFlow public read dispatches" on public.dispatches for select to anon, authenticated using (true);
  create policy "FleetFlow public write dispatches" on public.dispatches for all to anon, authenticated using (true) with check (true);
  create policy "FleetFlow public read orders" on public.orders for select to anon, authenticated using (true);
  create policy "FleetFlow public write orders" on public.orders for all to anon, authenticated using (true) with check (true);
  create policy "FleetFlow public read vehicles" on public.vehicles for select to anon, authenticated using (true);
  create policy "FleetFlow public write vehicles" on public.vehicles for all to anon, authenticated using (true) with check (true);
  create policy "FleetFlow public read drivers" on public.drivers for select to anon, authenticated using (true);
  create policy "FleetFlow public write drivers" on public.drivers for all to anon, authenticated using (true) with check (true);
  create policy "FleetFlow public read marketers" on public.marketers for select to anon, authenticated using (true);
  create policy "FleetFlow public write marketers" on public.marketers for all to anon, authenticated using (true) with check (true);
exception when duplicate_object then null;
end $$;
