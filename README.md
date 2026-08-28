# Zeptor Esports

A React + TypeScript esports website built with Vite and Tailwind CSS.

## Project structure

- `index.html` — main HTML template for Vite.
- `package.json` — dependencies and scripts.
- `tsconfig.json` / `tsconfig.node.json` — TypeScript configuration.
- `vite.config.ts` — Vite build settings.
- `tailwind.config.ts` — Tailwind CSS theme extensions.
- `postcss.config.js` — PostCSS configuration.

### `src/`
- `main.tsx` — React application entry point.
- `App.tsx` — route definitions and top-level layout wrapper.
- `index.css` — global Tailwind and custom styles.
- `components/` — shared UI pieces like `Navbar`, `Footer`, and `Layout`.
- `routes/` — page screens rendered by React Router.
- `data/` — static content data used by pages.
- `assets/` — image and media assets.
- `types/` — TypeScript interfaces and shared types.

## How to run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4173` after the dev server starts.

## Build for production

```bash
npm run build
```

## Deployment

This project can be deployed on Vercel, Netlify, or any static host that supports Vite.

- Build output is generated into `dist/`.
- The site works without environment variables and shows a YouTube channel fallback.
- To load live status and latest videos, set `VITE_YOUTUBE_API_URL` to a server-side proxy endpoint. That endpoint should return `{ "videos": [...], "live": null | {...} }` using a private `YOUTUBE_API_KEY`; never put the API key in Vite client variables.

## Notes

- `src/routes/` contains the main page views.
- `src/components/` contains layout and reusable UI components.
- `src/data/` stores mock content for scrims, tournaments, news, and leaderboard.

## Supabase setup

The Season 2 registration feature uses Supabase when these Vite variables are configured in `.env.local` and in Vercel Project Settings:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Run `supabase/schema.sql` in the Supabase SQL Editor. It creates the registration table, database-enforced 48-team limit, RLS policies, and realtime publication. Add the `admin` role to an authenticated user's `app_metadata` to allow registration reads and status updates. The browser fallback remains available for local development if Supabase is unavailable.
