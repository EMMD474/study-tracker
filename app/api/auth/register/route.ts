import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { registerSchema } from "@/lib/zod"

export async function POST(request: Request) {
  const body = await request.json()

  const parsed = registerSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  const {name, email, password } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return Response.json({ error: "Email already in use" }, { status: 409 })
  }

  const hashed = await hash(password, 12)
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  })

  return Response.json({ id: user.id, email: user.email }, { status: 201 })
}
