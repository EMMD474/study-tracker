'use client'

import React from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import CenterFocusStrongRoundedIcon from '@mui/icons-material/CenterFocusStrongRounded'

type QuickAction = {
  label: string
  icon: React.ReactNode
  onClick?: () => void
}

type QuickActionsProps = {
  onAddSession?: () => void
  onAddCourse?: () => void
  onOpenTimetable?: () => void
  onFocusMode?: () => void
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onAddSession,
  onAddCourse,
  onOpenTimetable,
  onFocusMode,
}) => {
  const actions: QuickAction[] = [
    {
      label: 'Add Session',
      icon: <AddRoundedIcon fontSize="medium" />,
      onClick: onAddSession,
    },
    {
      label: 'Add Course',
      icon: <SchoolRoundedIcon fontSize="medium" />,
      onClick: onAddCourse,
    },
    {
      label: 'Timetable',
      icon: <CalendarMonthRoundedIcon fontSize="medium" />,
      onClick: onOpenTimetable,
    },
    {
      label: 'Focus Mode',
      icon: <CenterFocusStrongRoundedIcon fontSize="medium" />,
      onClick: onFocusMode,
    },
  ]

  return (
    <div className="rounded-2xl bg-[#121212] border border-yellow-500/10 p-6 w-full h-full">
      <h3
        className="text-sm uppercase tracking-wider mb-4"
        style={{ color: '#7a7060' }}
      >
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-white/5 
                       bg-[#0d0d0d] hover:border-yellow-500/30 transition-all duration-200
                       hover:shadow-[0_0_20px_rgba(200,169,110,0.1)] group"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                          group-hover:scale-110"
              style={{
                background: 'rgba(200, 169, 110, 0.08)',
                color: '#c8a96e',
              }}
            >
              {action.icon}
            </div>
            <span
              className="text-xs text-center transition-colors duration-200 group-hover:text-[#c8a96e]"
              style={{ color: '#888' }}
            >
              {action.label}
            </span>
          </button>
        ))}
      </div>

    </div>
  )
}

export default QuickActions
