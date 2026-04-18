'use client'

import React from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded'
import { Typography } from '@mui/material'

type SessionStatus = 'pending' | 'active' | 'completed'

type StudySession = {
  id: string
  courseId: string
  courseName: string
  priority: string
  startTime: string
  endTime: string
  duration: string
  status: SessionStatus
}

type TodayPlanProps = {
  sessions?: StudySession[]
  onStartSession?: (id: string) => void
  onCompleteSession?: (id: string) => void
}

const TodayPlan: React.FC<TodayPlanProps> = ({
  sessions = [],
  onStartSession,
  onCompleteSession,
}) => {
  const getStatusStyles = (status: SessionStatus) => {
    switch (status) {
      case 'completed':
        return {
          border: 'border-green-500/20',
          bg: 'rgba(34, 197, 94, 0.05)',
          icon: <CheckCircleRoundedIcon className="text-green-500" />,
          text: 'text-green-400',
        }
      case 'active':
        return {
          border: 'border-yellow-500/30',
          bg: 'rgba(200, 169, 110, 0.08)',
          icon: (
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
          ),
          text: 'text-yellow-400',
        }
      default:
        return {
          border: 'border-white/5',
          bg: 'transparent',
          icon: <RadioButtonUncheckedRoundedIcon className="text-gray-600" />,
          text: 'text-gray-400',
        }
    }
  }

  return (
    <div className="rounded-2xl bg-[#121212] border border-yellow-500/10 p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <Typography
          variant="h6"
          className="font-semibold"
          style={{ color: '#e8e6e0' }}
        >
          Today's Plan
        </Typography>
        <span
          className="text-xs uppercase tracking-wider px-2 py-1 rounded-full"
          style={{
            color: '#c8a96e',
            background: 'rgba(200, 169, 110, 0.1)',
            border: '1px solid rgba(200, 169, 110, 0.2)',
          }}
        >
          {sessions.filter((s) => s.status === 'completed').length} /{' '}
          {sessions.length} done
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {sessions.map((session, index) => {
          const styles = getStatusStyles(session.status)
          const isLast = index === sessions.length - 1

          return (
            <div key={session.id} className="flex items-center gap-4">
              <div
                className="relative flex flex-col items-center"
                style={{ minWidth: 24 }}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${styles.border.replace(
                    'border-',
                    'border-2 border-'
                  )}`}
                  style={{
                    background:
                      session.status === 'active'
                        ? 'rgba(200, 169, 110, 0.15)'
                        : session.status === 'completed'
                          ? 'rgba(34, 197, 94, 0.1)'
                          : '#1a1a1a',
                  }}
                >
                  {styles.icon}
                </div>
                {!isLast && (
                  <div
                    className="w-0.5 flex-1 min-h-[40px]"
                    style={{
                      background:
                        session.status === 'completed'
                          ? 'linear-gradient(to bottom, rgba(34, 197, 94, 0.4), rgba(255,255,255,0.05))'
                          : 'rgba(255,255,255,0.05)',
                    }}
                  />
                )}
              </div>

              <div
                className={`flex-1 rounded-xl p-4 flex items-center justify-between ${styles.border}`}
                style={{
                  background: styles.bg,
                  borderWidth: 1,
                  borderColor:
                    session.status === 'active'
                      ? 'rgba(200, 169, 110, 0.3)'
                      : session.status === 'completed'
                        ? 'rgba(34, 197, 94, 0.2)'
                        : 'rgba(255,255,255,0.05)',
                  opacity: session.status === 'pending' ? 0.6 : 1,
                }}
              >
                <div className="flex flex-col gap-1">
                  <Typography
                    className="font-medium"
                    style={{
                      color:
                        session.status === 'completed'
                          ? '#6b7280'
                          : '#e8e6e0',
                      textDecoration:
                        session.status === 'completed'
                          ? 'line-through'
                          : 'none',
                    }}
                  >
                    {session.courseName}
                  </Typography>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs"
                      style={{ color: '#7a7060' }}
                    >
                      {session.startTime} - {session.endTime}
                    </span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        color: '#888',
                      }}
                    >
                      {session.duration}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {session.status === 'pending' && (
                    <button
                      onClick={() => onStartSession?.(session.id)}
                      className="p-2 rounded-lg transition-all duration-200 hover:bg-yellow-500/10 group"
                    >
                      <PlayArrowRoundedIcon
                        className="text-yellow-500/60 group-hover:text-yellow-500 transition-colors"
                        fontSize="small"
                      />
                    </button>
                  )}
                  {session.status === 'active' && (
                    <button
                      onClick={() => onCompleteSession?.(session.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                      style={{
                        background: 'rgba(34, 197, 94, 0.15)',
                        color: '#22c55e',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                      }}
                    >
                      Complete
                    </button>
                  )}
                  {session.status === 'completed' && (
                    <CheckCircleRoundedIcon
                      className="text-green-500/60"
                      fontSize="small"
                    />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TodayPlan
