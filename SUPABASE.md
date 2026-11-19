# FleetFlow Supabase backend

The connected FleetFlow project is `fleetflow-backend` in Mumbai (`ap-south-1`).
Project reference: `lmmalterjuohplmotrmq`.

FleetFlow now has a typed Supabase client, a data service for all operational collections, optimistic persistence for existing CRUD actions, and a per-collection mock fallback.

## Configure the client

The workspace already contains a private `.env.local` for the connected project. For another machine, copy `.env.example` to `.env.local` and set the public browser values from Supabase Project Settings > API:

```bash
VITE_SUPABASE_URL=https://lmmalterjuohplmotrmq.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

Only the publishable/anon key belongs in the frontend. Do not put a service-role key in `.env.local`, source control, or a browser build.

## Create the schema

Run these files in the Supabase SQL Editor, in order:

1. `supabase/migrations/001_fleetflow_schema.sql`
2. `supabase/seed.sql`

The migration creates the products, inventory, shipments, dispatches, orders, vehicles, drivers, and marketers tables, indexes the operational status fields, enables row-level security, and adds idempotent policies for the current unauthenticated prototype. Before production use, add Supabase Auth and replace the public write policies with user/role-based policies.

## Runtime behavior

`src/services/supabase.ts` creates the client only when both environment variables exist. `src/services/fleetflow.ts` maps the database's snake_case columns to FleetFlow's typed domain objects and persists collection changes with upsert/delete operations. `src/hooks/useFleetFlowData.ts` loads every collection on startup.

If a variable is missing, a table does not exist, or a read fails, only that collection falls back to the realistic mock seed. The rest of the application remains usable. The current UI is optimistic: local changes render immediately and are written to Supabase in the background.

## Data model

- `products`: catalogue, packaging, batches, expiry, reorder thresholds
- `inventory`: stock movement, damage, reservations, availability, locations
- `shipments`: supplier arrivals, receiving quantities, verification status, QR identifiers
- `dispatches`: outbound routes, products, vehicle/driver assignment, delivery status
- `orders`: marketer orders, value, delivery date, approval status, priority
- `vehicles`: registration, capacity, driver assignment, maintenance, mock location
- `drivers`: contact, licence, assignment, trip and delivery counters, rating
- `marketers`: retail account contact, territory, orders, revenue, account status

The schema intentionally keeps the existing frontend's display-ready strings, such as `arrival`, `created`, and `last_updated`, so the backend can be connected without changing the current UX. A later production hardening pass can add normalized timestamps and warehouse/user foreign keys.

## Checks

```bash
npm install
npm run build
```

When no `.env.local` is present, a successful build still produces a fully usable mock-mode FleetFlow app.
