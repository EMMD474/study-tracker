import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const updateTaskSchema = z.object({
  status: z.enum(["PENDING", "COMPLETED", "MISSED"]),
})

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = updateTaskSchema.safeParse(body)
    
    if (!parsed.success) {
      return Response.json({ error: "Invalid status" }, { status: 400 })
    }

    const { status } = parsed.data

    // Verify task belongs to user
    const task = await prisma.studyTask.findFirst({
      where: {
        id: params.id,
        course: { userId: session.user.id }
      }
    })

    if (!task) {
      return Response.json({ error: "Task not found" }, { status: 404 })
    }

    const updatedTask = await prisma.studyTask.update({
      where: { id: params.id },
      data: {
        status,
        completedAt: status === "COMPLETED" ? new Date() : null
      }
    })

    return Response.json(updatedTask)
  } catch (error) {
    console.error("[STUDY_TASK_PATCH]", error)
    return Response.json({ error: "Failed to update task" }, { status: 500 })
  }
}
