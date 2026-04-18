'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Welcome from "@/components/Welcome"
import StatsGrid from "@/components/StatsGrid"
import TodayPlan from "@/components/TodayPlan"
import QuickActions from "@/components/QuickActions"
import ProgressAnalytics from "@/components/ProgressAnalytics"
import Streak from "@/components/Streak"
import UpcomingTasks from "@/components/UpcomingTasks"
import { dashboardApi, studyTaskApi } from "@/lib/api"
import { toast } from "sonner"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res = await dashboardApi.get()
      setData(res)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
      toast.error("Cloud not load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCompleteTask = async (taskId: string) => {
    try {
      await studyTaskApi.update(taskId, { status: "COMPLETED" })
      toast.success("Task completed!")
      fetchData() // Refresh stats
    } catch (error) {
      toast.error("Failed to update task")
    }
  }

  if (loading) {
    return <div className="flex-1 flex items-center justify-center text-[#7a7060]">Loading your progress...</div>
  }

  const sessions = data?.tasks?.map((t: any) => ({
    id: t.id,
    courseId: t.courseId,
    courseName: t.course.name,
    priority: t.course.priority,
    status: t.status.toLowerCase(),
    startTime: "09:00", // Placeholder for now
    endTime: "10:00",   // Placeholder for now
    duration: `${t.course.allocatedTime}m`,
  })) || []

  return (
    <div className="min-h-0 flex-1 p-4 lg:p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <Welcome name={session?.user?.name || "Student"} />
        
        <StatsGrid 
          tasksCompleted={data?.stats?.completedTasks}
          totalTasks={data?.stats?.totalTasks}
          currentStreak={data?.stats?.currentStreak}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <TodayPlan 
              sessions={sessions} 
              onCompleteSession={handleCompleteTask}
            />
          </div>

          <div className="lg:col-span-4">
            <QuickActions />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <ProgressAnalytics />
          </div>

          <div className="lg:col-span-4">
            <Streak 
              current={data?.stats?.currentStreak}
              activity={new Array(7).fill(false).map((_, i) => {
                // Mock activity for heatmap based on streak for demo
                return i >= 7 - (data?.stats?.currentStreak || 0)
              })}
            />
          </div>
        </div>

        <UpcomingTasks />
      </div>
    </div>
  )
}
