# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
# Development
pnpm dev          # Start Next.js dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Database (requires Docker running)
docker compose up -d          # Start PostgreSQL container
npx prisma generate           # Regenerate Prisma client
npx prisma db push            # Push schema changes to DB
npx prisma migrate dev        # Create and apply a migration
npx prisma studio             # Open Prisma Studio GUI

# Helper scripts (Linux/macOS)
bash scripts/setup.sh         # First-time setup: Docker + pnpm install + Prisma
bash scripts/run.sh           # Start Docker + dev server
bash scripts/stop.sh          # Stop Docker containers
```

There are no tests configured yet.

## Architecture

**Median Stratum** is a full-stack study planning and tracking app built with Next.js App Router, Prisma ORM, and PostgreSQL (Docker).

### Data flow

Prisma client is generated into `app/generated/prisma/` (not the default location). Import it from there. The schema lives in `prisma/schema.prisma`.

Database models: **User** → **Course** → **StudyTask** / **Material**. A user owns courses; each course has daily study tasks (PENDING/COMPLETED/MISSED) and optional file materials.

### Key paths

- `app/` — Next.js App Router pages and layouts
- `app/auth/` — Login and register pages
- `app/dashboard/` — Main dashboard (in progress)
- `app/courses/` — Course management (in progress)
- `components/auth/` — Auth UI components including `AuthQuoteSlider` (animated carousel)
- `components/ComingSoonBanner.tsx` — Global banner shown in root layout
- `prisma/schema.prisma` — Database schema

### Styling

Tailwind CSS v4 with a custom "Black & Gold" theme defined in `app/globals.css`. MUI/Emotion is also installed for component-level styling.

### Environment

`.env` contains `DATABASE_URL` and individual DB credential vars used by `docker-compose.yml`. The Docker service is named `study-tracker-db` and runs PostgreSQL 16 on port 5432.
