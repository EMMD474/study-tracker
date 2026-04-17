import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { courseSchema } from "@/lib/zod"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const courses = await prisma.course.findMany({
      where: { userId: session.user.id },
      orderBy: { name: "asc" },
    })
    return Response.json(courses)
  } catch (error) {
    console.error("[COURSE_GET]", error)
    return Response.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = courseSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const { name, priority, allocatedTime } = parsed.data

    const course = await prisma.course.create({
      data: {
        name,
        priority,
        allocatedTime,
        userId: session.user.id,
      },
    })

    return Response.json(course, { status: 201 })
  } catch (error) {
    console.error("[COURSE_POST]", error)
    return Response.json({ error: "Failed to create course" }, { status: 500 })
  }
}
