import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { materialSchema } from "@/lib/zod"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: courseId } = await params

  try {
    const materials = await prisma.material.findMany({
      where: {
        courseId: courseId,
        course: { userId: session.user.id },
      },
      orderBy: { uploadedAt: "desc" },
    })
    return Response.json(materials)
  } catch (error) {
    console.error("[MATERIAL_GET]", error)
    return Response.json({ error: "Failed to fetch materials" }, { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = materialSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const { id: courseId } = await params
    const { fileName, fileUrl } = parsed.data

    // Verify course belongs to user
    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
        userId: session.user.id,
      },
    })

    if (!course) {
      return Response.json({ error: "Course not found" }, { status: 404 })
    }

    const material = await prisma.material.create({
      data: {
        fileName,
        fileUrl,
        courseId: courseId,
      },
    })

    return Response.json(material, { status: 201 })
  } catch (error) {
    console.error("[MATERIAL_POST]", error)
    return Response.json({ error: "Failed to create material" }, { status: 500 })
  }
}
