import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Verify material belongs to user's course
    const material = await prisma.material.findFirst({
      where: {
        id: params.id,
        course: { userId: session.user.id },
      },
    })

    if (!material) {
      return Response.json({ error: "Material not found" }, { status: 404 })
    }

    await prisma.material.delete({
      where: { id: params.id },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error("[MATERIAL_DELETE]", error)
    return Response.json({ error: "Failed to delete material" }, { status: 500 })
  }
}
