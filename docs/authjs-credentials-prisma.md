# AuthJS v5 + Credentials + Prisma (PostgreSQL) — Setup Reference

Stack versions in this project: `next-auth@5.0.0-beta.30`, `prisma@7.6.0`, `next@16.2.1`

---

## 1. Packages

```bash
pnpm add next-auth bcryptjs
pnpm add @prisma/adapter-pg pg
pnpm add -D prisma @types/pg
```

> `bcryptjs` v3+ ships its own types — no `@types/bcryptjs` needed.
> `@prisma/adapter-pg` is required in Prisma v7; the client no longer reads `DATABASE_URL` on its own.

---

## 2. Prisma schema

`prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"   # non-default output used in this project
}

datasource db {
  provider = "postgresql"
  # NO url field here — Prisma v7 removed support for it in schema.prisma
  # Connection URL lives in prisma.config.ts (for CLI) and PrismaPg adapter (for the client)
}

model User {
  id         String   @id @default(cuid())
  email      String   @unique
  password   String?  # nullable — OAuth users won't have one
  providerId String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
}
```

---

## 3. Prisma config (CLI connection)

`prisma.config.ts` — used by `prisma migrate`, `prisma db push`, `prisma studio`, etc.

```ts
import "dotenv/config"
import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
})
```

---

## 4. Prisma client singleton

`lib/prisma.ts` — the runtime client used in API routes and `auth.ts`.

```ts
import { PrismaClient } from "@/app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

// Prisma v7: pass the pg adapter with the connection string explicitly
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })

// Singleton pattern — prevents multiple PrismaClient instances in dev (hot-reload)
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
```

Why the singleton: Next.js dev server hot-reloads modules without restarting Node. Without it,
every reload opens a new DB connection pool until the process hits the connection limit.

---

## 5. Validation schema

`lib/zod.ts` — shared between `authorize` and the register route.

```ts
import { object, string } from "zod"

export const signInSchema = object({
  email: string().min(1).email(),
  password: string().min(8).max(32),
})
```

---

## 6. Auth config

`auth.ts` — project root, re-exported everywhere via `@/auth`.

```ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"
import { signInSchema } from "@/lib/zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        // 1. Validate shape with zod before touching the DB
        const parsed = signInSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data

        // 2. Look up the user
        const user = await prisma.user.findUnique({ where: { email } })

        // 3. Guard: user must exist AND have a password (OAuth users don't)
        if (!user || !user.password) return null

        // 4. Constant-time comparison — never compare plain text
        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) return null

        // 5. Return only the fields AuthJS needs — not the full DB row
        return { id: user.id, email: user.email }
      },
    }),
  ],
})
```

---

## 7. Route handler

`app/api/auth/[...nextauth]/route.ts`

```ts
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```

---

## 8. Register endpoint

`app/api/auth/register/route.ts`

```ts
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { signInSchema } from "@/lib/zod"

export async function POST(request: Request) {
  const body = await request.json()

  const parsed = signInSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  const { email, password } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return Response.json({ error: "Email already in use" }, { status: 409 })
  }

  const hashed = await hash(password, 12)   # cost factor 12 is the recommended baseline
  const user = await prisma.user.create({
    data: { email, password: hashed },
  })

  return Response.json({ id: user.id, email: user.email }, { status: 201 })
}
```

---

## 9. Environment variables

`.env`

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

AUTH_SECRET=<generate with: openssl rand -hex 32>

# Google OAuth (optional, remove Google provider if not using)
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
```

> `.env` must be in `.gitignore`. Never commit real secrets.

---

## 10. Gotchas specific to this stack

| Problem | Cause | Fix |
|---|---|---|
| `url` field rejected in schema.prisma | Prisma v7 removed datasource URL from schema | Put URL in `prisma.config.ts` + `PrismaPg` adapter |
| `PrismaClient` ignores `DATABASE_URL` | Prisma v7 requires explicit adapter | Pass `new PrismaPg({ connectionString })` to constructor |
| Credentials provider bypassed by no-password check | Missing `!user.password` guard | Always guard before `compare()` |
| Multiple DB connections in dev | No singleton | Use `globalForPrisma` pattern in `lib/prisma.ts` |
| AuthJS JWT vs DB sessions | Credentials only supports JWT sessions | Do not configure `session: { strategy: "database" }` with Credentials |
| `authorize` returning full Prisma row | Extra fields leak into JWT | Return only `{ id, email }` |
