'use client'

import React from 'react'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'

type StatItem = {
  label: string
  value: string | number
  icon: React.ReactNode
  color: string
}

type StatsGridProps = {
  studyTime?: string
  tasksCompleted?: number
  totalTasks?: number
  currentStreak?: number
  upcomingSessions?: number
}

const StatsGrid: React.FC<StatsGridProps> = ({
  studyTime = '2h 30m',
  tasksCompleted = 3,
  totalTasks = 5,
  currentStreak = 5,
  upcomingSessions = 2,
}) => {
  const stats: StatItem[] = [
    {
      label: 'Study Time Today',
      value: studyTime,
      icon: <AccessTimeRoundedIcon />,
      color: '#c8a96e',
    },
    {
      label: 'Tasks Completed',
      value: `${tasksCompleted}/${totalTasks}`,
      icon: <TaskAltRoundedIcon />,
      color: '#22c55e',
    },
    {
      label: 'Current Streak',
      value: `${currentStreak} days`,
      icon: <WhatshotRoundedIcon />,
      color: '#f97316',
    },
    {
      label: 'Upcoming Sessions',
      value: upcomingSessions,
      icon: <CalendarMonthRoundedIcon />,
      color: '#60a5fa',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-xl bg-[#121212] border border-yellow-500/10 p-4 flex flex-col gap-3 hover:border-yellow-500/20 transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <span
              className="text-xs uppercase tracking-wider"
              style={{ color: '#7a7060' }}
            >
              {stat.label}
            </span>
            <div style={{ color: stat.color }}>{stat.icon}</div>
          </div>
          <div
            className="text-2xl lg:text-3xl font-semibold"
            style={{
              fontFamily: "'Fraunces', serif",
              color: '#e8e6e0',
              lineHeight: 1,
            }}
          >
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid
