'use client'

import React from 'react'
import { Typography } from '@mui/material'

type SubjectData = {
  name: string
  hours: number
  color: string
}

type WeeklyData = {
  day: string
  hours: number
}

type ProgressAnalyticsProps = {
  weeklyData?: WeeklyData[]
  subjectData?: SubjectData[]
}

const ProgressAnalytics: React.FC<ProgressAnalyticsProps> = ({
  weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.0 },
    { day: 'Fri', hours: 2.0 },
    { day: 'Sat', hours: 3.5 },
    { day: 'Sun', hours: 2.2 },
  ],
  subjectData = [
    { name: 'Mathematics', hours: 5.5, color: '#c8a96e' },
    { name: 'Physics', hours: 4.0, color: '#60a5fa' },
    { name: 'Computer Science', hours: 6.2, color: '#22c55e' },
    { name: 'Chemistry', hours: 2.5, color: '#f472b6' },
  ],
}) => {
  const maxHours = Math.max(...weeklyData.map((d) => d.hours))
  const totalHours = weeklyData.reduce((sum, d) => sum + d.hours, 0)
  const maxSubjectHours = Math.max(...subjectData.map((s) => s.hours))

  return (
    <div className="rounded-2xl bg-[#121212] border border-yellow-500/10 p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <Typography
          variant="h6"
          className="font-semibold"
          style={{ color: '#e8e6e0' }}
        >
          Progress Analytics
        </Typography>
        <span
          className="text-xs px-2 py-1 rounded-full"
          style={{
            color: '#22c55e',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          }}
        >
          {totalHours.toFixed(1)}h this week
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Bar Chart */}
        <div className="flex-1">
          <h4
            className="text-xs uppercase tracking-wider mb-4"
            style={{ color: '#7a7060' }}
          >
            Weekly Study Hours
          </h4>
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyData.map((day, index) => {
              const heightPercent = (day.hours / maxHours) * 100
              const isToday = index === weeklyData.length - 1

              return (
                <div
                  key={day.day}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-t-md transition-all duration-300"
                    style={{
                      height: `${Math.max(heightPercent, 4)}%`,
                      background: isToday
                        ? 'linear-gradient(to top, #c8a96e, #d4af37)'
                        : 'linear-gradient(to top, #2a2a2a, #1f1f1f)',
                      boxShadow: isToday
                        ? '0 0 12px rgba(200, 169, 110, 0.3)'
                        : 'none',
                    }}
                  />
                  <span
                    className="text-xs"
                    style={{
                      color: isToday ? '#c8a96e' : '#555',
                      fontWeight: isToday ? 600 : 400,
                    }}
                  >
                    {day.day}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Subject Distribution */}
        <div
          className="w-full lg:w-48"
          style={{
            borderLeft: '1px solid rgba(255,255,255,0.05)',
            paddingLeft: '1.5rem',
          }}
        >
          <h4
            className="text-xs uppercase tracking-wider mb-4"
            style={{ color: '#7a7060' }}
          >
            Subject Distribution
          </h4>
          <div className="flex flex-col gap-3">
            {subjectData.map((subject) => {
              const percent = (subject.hours / maxSubjectHours) * 100

              return (
                <div key={subject.name} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs"
                      style={{ color: '#b0b0b0' }}
                    >
                      {subject.name}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: '#666' }}
                    >
                      {subject.hours}h
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: '#1a1a1a' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        background: subject.color,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressAnalytics
