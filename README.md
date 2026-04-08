# Median Stratum (Study Tracker)

**Median Stratum** is a premium, academic-focused study planning and progress tracking system. It's built for students who need more than just a to-do list—it's a system to track every subject, every session, and stay consistent through high-priority scheduling and smart reminders.

**Please see [`design.md`](./design.md) for the detailed project plan and features roadmap.**

---

## Features

- **Premium Aesthetic**: A custom "Black & Gold" high-fidelity theme (Tailwind CSS v4).
- **Authentication**: Email/password credentials and Google OAuth, both persisted to the database.
- **Route Protection**: Unauthenticated users are redirected to login — only `/auth/*` and `/timetable` are public.
- **Dynamic Content**: Animated multi-stage quote slider on the auth screens.
- **Docker-Ready**: Integrated PostgreSQL 16 database via Docker Compose.
- **Organized Workflow**: Dedicated scripts for setup, running, stopping, and deploying.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4, MUI/Emotion |
| Auth | Auth.js v5 (next-auth) — Credentials + Google OAuth |
| ORM | Prisma 7 with `@prisma/adapter-pg` |
| Database | PostgreSQL 16 (Docker) |
| Package Manager | pnpm |

---

## Prerequisites

- **Node.js** v18+
- **pnpm**
- **Docker & Docker Compose**

---

## Getting Started

### 1. Environment

Copy the example and fill in your values:

```bash
cp .env.example .env
```

Required variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
AUTH_SECRET=          # generate with: openssl rand -hex 32
AUTH_GOOGLE_ID=       # from Google Cloud Console
AUTH_GOOGLE_SECRET=   # from Google Cloud Console
```

### 2. Initial Setup

Installs dependencies, starts Docker, generates the Prisma client, and pushes the schema.

```bash
# Linux/macOS
bash scripts/setup.sh

# Windows
.\scripts\setup.bat
```

### 3. Run

```bash
# Linux/macOS
bash scripts/run.sh

# Windows
.\scripts\run.bat
```

Open [http://localhost:3000](http://localhost:3000). You will be redirected to `/auth/login`.

### 4. Stop

```bash
bash scripts/stop.sh   # Linux/macOS
.\scripts\stop.bat     # Windows
```

---

## Auth

Authentication is handled by Auth.js v5 (`next-auth@5`).

**Credentials flow**
1. Register at `/auth/register` — password is hashed with bcrypt (cost 12) and stored in the `User` table.
2. Sign in at `/auth/login` — email/password verified against the stored hash.

**Google OAuth flow**
1. Click "Sign in with Google" on either the login or register page.
2. On successful OAuth callback, the user is upserted into the `User` table (`email` + `providerId`). No password is stored for OAuth users.

**Route protection** is enforced in `proxy.ts` (Next.js 16 equivalent of `middleware.ts`). Public routes: `/auth/login`, `/auth/register`, `/timetable`. Everything else requires a session.

See [`docs/authjs-credentials-prisma.md`](./docs/authjs-credentials-prisma.md) for a full setup reference.

---

## Database

PostgreSQL runs as a Docker container (`study-tracker-db`, port 5432).

```bash
npx prisma generate       # Regenerate the Prisma client after schema changes
npx prisma db push        # Sync schema to the database (dev)
npx prisma migrate dev    # Create and apply a named migration
npx prisma studio         # Open the Prisma data browser
```

> Prisma 7 no longer reads `DATABASE_URL` from `schema.prisma`. The CLI reads it from `prisma.config.ts`; the runtime client uses the `PrismaPg` adapter in `lib/prisma.ts`.

---

## Project Structure

```
app/
  api/auth/         — Auth.js route handler + register endpoint
  auth/             — Login and register pages
  dashboard/        — Main dashboard (in progress)
  courses/          — Course management (in progress)
  timetable/        — Public timetable view
components/
  auth/             — Reusable auth UI components
  TopNav.tsx        — Top navigation bar
  TimeTable.tsx     — Timetable view component
  ComingSoonBanner.tsx — Banner for pages under construction
lib/
  prisma.ts         — PrismaClient singleton (PrismaPg adapter)
  zod.ts            — Shared validation schemas
prisma/
  schema.prisma     — Database schema
prisma.config.ts    — Prisma CLI config (connection URL, migrations path)
proxy.ts            — Route protection (Next.js 16 middleware)
auth.ts             — Auth.js config (providers, signIn callback)
docs/               — Setup references and architecture notes
scripts/            — Cross-platform setup/run/stop/deploy scripts
docker-compose.yml  — PostgreSQL container definition
```

---

## Deployment

The `scripts/deploy` script automates build verification and the Git merge workflow:

1. Runs `pnpm build` to check for errors.
2. Pushes the current branch to `origin`.
3. Merges into `main`.
4. Returns you to your working branch.
