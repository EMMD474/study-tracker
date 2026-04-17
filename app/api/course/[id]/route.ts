import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { courseSchema } from "@/lib/zod"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  try {
    const body = await req.json()
    // Partial validation for PATCH
    const parsed = courseSchema.partial().safeParse(body)

    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const updatedCourse = await prisma.course.update({
      where: {
        id,
        userId: session.user.id, // Ensure owner
      },
      data: parsed.data,
    })

    return Response.json(updatedCourse)
  } catch (error) {
    console.error("[COURSE_PATCH]", error)
    return Response.json({ error: "Failed to update course" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  try {
    await prisma.course.delete({
      where: {
        id,
        userId: session.user.id, // Ensure owner
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error("[COURSE_DELETE]", error)
    return Response.json({ error: "Failed to delete course" }, { status: 500 })
  }
}
