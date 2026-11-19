# FleetFlow

FleetFlow is a responsive React + TypeScript warehouse and logistics system for a beverage distribution godown, connected to a Supabase backend.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL printed in the terminal.

## Build

```bash
npm run build
```

## Included

- React, TypeScript, React Router, Lucide icons, Recharts, Tailwind/PostCSS setup
- Supabase data layer with typed services and safe mock fallback when configuration or tables are unavailable
- Responsive dark-sidebar operations shell
- Dashboard with stock movement and warehouse health analytics
- Products CRUD with validation and destructive confirmation
- Inventory health, low-stock alerts, searchable tables, and local sync state
- Incoming and outgoing stock operations with real local add forms and status updates
- Orders with local create, approve, reject, and status filters
- Vehicles, drivers, and marketers with local add forms and status controls
- QR management with scan simulation and downloadable code metadata
- Mock live tracking with refresh state, reports, and settings
- Functional module search and local report export to JSON
- Documented Supabase schema, idempotent seed SQL, browser client configuration, and RLS notes
- Mobile navigation and responsive layouts

All vehicle positions in Live Tracking are explicitly mock locations, not real GPS tracking.

The connected Supabase project is `fleetflow-backend` in Mumbai (`ap-south-1`). See `SUPABASE.md` for schema, RLS, and local environment setup.
