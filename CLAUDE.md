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

- `app/auth/` — Login and register pages
- `app/(main)/` — Route group for authenticated pages (dashboard, courses, timetable, timer); uses `MainLayout.tsx` which renders `TopNav` and a global floating action button for creating courses
- `app/api/` — Route handlers; all protected routes call `auth()` from `@/auth` to get the session
- `auth.ts` — NextAuth v5 config (Google OAuth + Credentials providers); exposes `{ handlers, signIn, signOut, auth }`
- `lib/prisma.ts` — Singleton Prisma client using `@prisma/adapter-pg` (driver-adapter mode, not the default TCP client)
- `lib/scheduler.ts` — `generateDailyTasks` (called on dashboard load) and `calculateStreak` server-side helpers
- `lib/api.ts` — Client-side API wrappers (axios)
- `lib/zod.ts` — Shared Zod schemas: `signInSchema`, `registerSchema`, `courseSchema`, `materialSchema`
- `components/auth/` — Auth UI components including `AuthQuoteSlider` (animated carousel)
- `prisma/schema.prisma` — Database schema

### Auth

NextAuth v5 (beta). Use `auth()` in Server Components / Route Handlers to get the session. `session.user.id` is populated via the `jwt` callback in `auth.ts`. Google OAuth upserts the user into the DB on first sign-in.

### Styling

Tailwind CSS v4 with a custom "Black & Gold" theme defined in `app/globals.css`. MUI/Emotion is also installed for component-level styling.

### Environment

`.env` contains `DATABASE_URL` and individual DB credential vars used by `docker-compose.yml`. The Docker service is named `study-tracker-db` and runs PostgreSQL 16 on port 5432.
