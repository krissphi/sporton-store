# SportOn FE

Learning project built as part of a course. This repository is intended for practice and experimentation while following the course materials.

SportOn FE is a frontend landing page for a performance sportswear brand concept (“SportOn”). The app currently focuses on the **Landing Page** sections: Hero, Categories, and Products using the Next.js App Router.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS v4 (via PostCSS)
- `next/font` (Google Font: Poppins)
- `react-icons`
- `react-toastify` (installed, not used in components yet)

## Requirements

- Node.js (LTS recommended)
- Package manager: `pnpm` (this project includes `pnpm-lock.yaml`)

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Scripts

```bash
pnpm dev     # run dev server
pnpm build   # build production
pnpm start   # run production server
pnpm lint    # run eslint
```

## Project Structure

- `app/(landing)/layout.tsx` — Landing layout (Header + Footer) + metadata.
- `app/(landing)/page.tsx` — Landing page (renders Hero/Categories/Products).
- `app/(landing)/components/home/*` — Landing sections (hero, categories, products).
- `app/(landing)/components/layouts/*` — Header & Footer.
- `app/(landing)/components/ui/*` — UI primitives (e.g., Button).
- `app/(dashboard)/` — Dashboard route group (currently empty).
- `public/images/*` — Image assets (logo, hero, categories, products).

## Styling & Conventions

- Global styles live in `app/globals.css`.
- Tailwind v4 is enabled via `@import "tailwindcss"`.
- Theme tokens are defined through CSS variables (e.g., `--color-primary`, `--color-dark`).
- Path alias is available: `@/*` (see `tsconfig.json`).

## Notes

- Categories and products data are currently hard-coded in the components (no API integration yet).
