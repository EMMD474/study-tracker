import { prisma } from "./prisma"

/**
 * Generates study tasks for a user for the current day if they don't already exist.
 * This should be called whenever the user visits the dashboard.
 */
export async function generateDailyTasks(userId: string) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  // 1. Get all courses for this user
  const courses = await prisma.course.findMany({
    where: { userId },
  })

  if (courses.length === 0) return []

  // 2. Check which courses already have a task for today
  const existingTasks = await prisma.studyTask.findMany({
    where: {
      course: { userId },
      date: today,
    },
    select: { courseId: true },
  })

  const existingCourseIds = new Set(existingTasks.map((t) => t.courseId))

  // 3. Create tasks for courses that don't have one yet
  const tasksToCreate = courses
    .filter((course) => !existingCourseIds.has(course.id))
    .map((course) => ({
      courseId: course.id,
      date: today,
      status: "PENDING" as const,
    }))

  if (tasksToCreate.length > 0) {
    await prisma.studyTask.createMany({
      data: tasksToCreate,
    })
  }

  // 4. Return all tasks for today
  return prisma.studyTask.findMany({
    where: {
      course: { userId },
      date: today,
    },
    include: {
      course: true,
    },
    orderBy: {
      course: {
        priority: 'desc'
      }
    }
  })
}

/**
 * Calculates the current streak for a user.
 * Definition: Number of consecutive days (counting backwards from yesterday/today)
 * where ALL scheduled tasks were COMPLETED.
 */
export async function calculateStreak(userId: string) {
  // Simple streak logic: check yesterday, then the day before, etc.
  let streak = 0
  const now = new Date()
  let checkDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  while (true) {
    const tasks = await prisma.studyTask.findMany({
      where: {
        course: { userId },
        date: checkDate,
      },
    })

    if (tasks.length === 0) {
      // If it's today and no tasks yet, just continue to yesterday
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      if (checkDate.getTime() === today.getTime()) {
        checkDate.setDate(checkDate.getDate() - 1)
        continue
      }
      break
    }

    const allCompleted = tasks.every((t) => t.status === "COMPLETED")
    if (allCompleted) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}
