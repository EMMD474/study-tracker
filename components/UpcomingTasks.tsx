'use client'

import React from 'react'
import { Typography } from '@mui/material'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'

type TaskType = 'session' | 'deadline' | 'exam'

type UpcomingTask = {
  id: string
  title: string
  course: string
  date: string
  time?: string
  type: TaskType
}

type UpcomingTasksProps = {
  tasks?: UpcomingTask[]
}

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({
  tasks = [
    {
      id: '1',
      title: 'Calculus Study Session',
      course: 'Mathematics',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'session',
    },
    {
      id: '2',
      title: 'Physics Assignment Due',
      course: 'Physics',
      date: 'Mar 20',
      type: 'deadline',
    },
    {
      id: '3',
      title: 'Midterm Exam',
      course: 'Computer Science',
      date: 'Mar 25',
      type: 'exam',
    },
    {
      id: '4',
      title: 'Organic Chemistry Review',
      course: 'Chemistry',
      date: 'Mar 22',
      time: '2:00 PM',
      type: 'session',
    },
  ],
}) => {
  const getTypeIcon = (type: TaskType) => {
    switch (type) {
      case 'session':
        return <ScheduleRoundedIcon className="text-blue-400" />
      case 'deadline':
        return <AssignmentRoundedIcon className="text-yellow-500" />
      case 'exam':
        return <EventRoundedIcon className="text-red-400" />
    }
  }

  const getTypeStyles = (type: TaskType) => {
    switch (type) {
      case 'session':
        return {
          bg: 'rgba(96, 165, 250, 0.05)',
          border: 'rgba(96, 165, 250, 0.15)',
          text: 'text-blue-400',
        }
      case 'deadline':
        return {
          bg: 'rgba(234, 179, 8, 0.05)',
          border: 'rgba(234, 179, 8, 0.15)',
          text: 'text-yellow-500',
        }
      case 'exam':
        return {
          bg: 'rgba(248, 113, 113, 0.05)',
          border: 'rgba(248, 113, 113, 0.15)',
          text: 'text-red-400',
        }
    }
  }

  return (
    <div className="rounded-2xl bg-[#121212] border border-yellow-500/10 p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <Typography
          variant="h6"
          className="font-semibold"
          style={{ color: '#e8e6e0' }}
        >
          Upcoming Tasks
        </Typography>
        <span
          className="text-xs px-2 py-1 rounded-full"
          style={{
            color: '#7a7060',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {tasks.length} upcoming
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {tasks.map((task) => {
          const styles = getTypeStyles(task.type)

          return (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                         hover:bg-white/[0.02] cursor-pointer"
              style={{
                borderLeft: `2px solid ${styles.border.split('(')[1].split(',')[0]}`,
                background: styles.bg,
              }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0d0d0d]">
                {getTypeIcon(task.type)}
              </div>

              <div className="flex-1 min-w-0">
                <Typography
                  className="text-sm font-medium truncate"
                  style={{ color: '#e8e6e0' }}
                >
                  {task.title}
                </Typography>
                <Typography
                  className="text-xs truncate"
                  style={{ color: '#666' }}
                >
                  {task.course}
                </Typography>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    color: '#888',
                  }}
                >
                  {task.date}
                </span>
                {task.time && (
                  <span
                    className="text-xs"
                    style={{ color: '#555' }}
                  >
                    {task.time}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UpcomingTasks
