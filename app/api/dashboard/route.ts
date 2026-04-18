import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { generateDailyTasks, calculateStreak } from "@/lib/scheduler"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.id

  try {
    // 1. Ensure tasks for today are generated and get them
    const todayTasks = await generateDailyTasks(userId)

    // 2. Calculate Stats
    const totalTasks = todayTasks.length
    const completedTasks = todayTasks.filter((t) => t.status === "COMPLETED").length
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    // 3. Calculate Streak
    const currentStreak = await calculateStreak(userId)

    // 4. Get some analytics (tasks completed in the last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    sevenDaysAgo.setHours(0, 0, 0, 0)

    const recentActivity = await prisma.studyTask.groupBy({
      by: ['date'],
      where: {
        course: { userId },
        date: { gte: sevenDaysAgo },
        status: 'COMPLETED'
      },
      _count: {
        id: true
      },
      orderBy: {
        date: 'asc'
      }
    })

    return Response.json({
      tasks: todayTasks,
      stats: {
        totalTasks,
        completedTasks,
        completionRate,
        currentStreak,
      },
      recentActivity: recentActivity.map(a => ({
        date: a.date.toISOString(),
        count: a._count.id
      }))
    })
  } catch (error) {
    console.error("[DASHBOARD_GET]", error)
    return Response.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
