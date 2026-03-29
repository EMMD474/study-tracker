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

## 🛠 Prerequisites

- **Node.js** (v18+)
- **pnpm** (preferred) or npm
- **Docker & Docker Compose** (for the PostgreSQL database)

---

## 🚀 Getting Started

We've provided a set of scripts in the `scripts/` directory to manage your environment efficiently across Windows and Linux/macOS.

### 1. Initial Setup
Run the setup script to install dependencies, generate the database schema, and prepare the environment.

- **Windows**: `.\scripts\setup.bat`
- **Linux/macOS**: `./scripts/setup.sh`

### 2. Run the Application
This will start both the PostgreSQL database (via Docker) and the Next.js development server.

- **Windows**: `.\scripts\run.bat`
- **Linux/macOS**: `./scripts/run.sh`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Stop Services
Cleanly shut down the database container and terminate the dev server.

- **Windows**: `.\scripts\stop.bat`
- **Linux/macOS**: `./scripts/stop.sh`

---

## 📦 Project Structure

- `app/`: Next.js App Router (pages, layouts, globals).
- `components/auth/`: Reusable, themed authentication components.
- `scripts/`: Cross-platform utility scripts for environment management.
- `docker-compose.yml`: Database infrastructure definition.
- `design.md`: Core system design and roadmap.

---

## 🛰 Deployment

The `scripts/deploy` script automates the build verification and Git merging workflow:

1. Runs `pnpm build` to check for errors.
2. Pushes the current branch to `origin`.
3. Merges the current branch into `main`.
4. Returns you to your working branch.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Docker Compose Documentation](https://docs.docker.com/compose/) - learn about managing multi-container applications.
