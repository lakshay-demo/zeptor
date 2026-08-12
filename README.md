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
- There are no required environment variables for this static site.

## Notes

- `src/routes/` contains the main page views.
- `src/components/` contains layout and reusable UI components.
- `src/data/` stores mock content for scrims, tournaments, news, and leaderboard.
