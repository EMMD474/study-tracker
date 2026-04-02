# Median Stratum (Study Tracker)

**Median Stratum** is a premium, academic-focused study planning and progress tracking system. It's built for students who need more than just a to-do list—it's a system to track every subject, every session, and stay consistent through high-priority scheduling and smart reminders.

**Please see [`design.md`](./design.md) for the detailed project plan and features roadmap.**

---

## ✨ Features

- **Premium Aesthetic**: A custom "Black & Gold" high-fidelity theme (using Tailwind CSS v4).
- **Comprehensive Auth**: Modern Login and Registration flows with reusable components.
- **Dynamic Content**: An animated, multi-stage quote slider to keep you motivated during sign-in.
- **Docker-Ready**: Integrated PostgreSQL database via Docker Compose.
- **Organized Workflow**: Dedicated scripts for setup, running, stopping, and deploying.

---

## 🧰 Tech Stack

- **Framework**: Next.js (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, MUI/Emotion
- **ORM**: Prisma 7
- **Database**: PostgreSQL 16 (via Docker)
- **Package Manager**: pnpm

---

## 🛠 Prerequisites

- **Node.js** (v18+)
- **pnpm**
- **Docker & Docker Compose** (for the PostgreSQL database)

---

## 🚀 Getting Started

Scripts in the `scripts/` directory manage your environment across Windows and Linux/macOS.

### 1. Initial Setup
Installs dependencies, starts Docker, generates the Prisma client, and pushes the schema to the database.

- **Linux/macOS**: `./scripts/setup.sh`
- **Windows**: `.\scripts\setup.bat`

### 2. Run the Application
Starts the PostgreSQL container and the Next.js development server.

- **Linux/macOS**: `./scripts/run.sh`
- **Windows**: `.\scripts\run.bat`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Stop Services

- **Linux/macOS**: `./scripts/stop.sh`
- **Windows**: `.\scripts\stop.bat`

---

## 🗄 Database

The database runs as a Docker container (`study-tracker-db`, PostgreSQL 16, port 5432). Connection details are in `.env`.

Useful Prisma commands:

```bash
npx prisma generate       # Regenerate the Prisma client
npx prisma db push        # Sync schema changes to the database
npx prisma migrate dev    # Create and apply a named migration
npx prisma studio         # Open the Prisma data browser
```

---

## 📦 Project Structure

- `app/` — Next.js App Router (pages, layouts, globals)
- `components/auth/` — Reusable, themed authentication components
- `prisma/` — Database schema and migrations
- `scripts/` — Cross-platform utility scripts for environment management
- `docker-compose.yml` — Database infrastructure definition
- `design.md` — Core system design and roadmap

---

## 🛰 Deployment

The `scripts/deploy` script automates build verification and the Git merge workflow:

1. Runs `pnpm build` to check for errors.
2. Pushes the current branch to `origin`.
3. Merges the current branch into `main`.
4. Returns you to your working branch.
