'use client'

import React from 'react'
import Link from 'next/link'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import CenterFocusStrongRoundedIcon from '@mui/icons-material/CenterFocusStrongRounded'

type QuickActionsProps = {
  onAddSession?: () => void
  onAddCourse?: () => void
  onFocusMode?: () => void
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onAddSession,
  onAddCourse,
  onFocusMode,
}) => {
  const actionButton = (
    icon: React.ReactNode,
    label: string,
    onClick?: () => void
  ) => (
    <button
      onClick={onClick}
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
        {icon}
      </div>
      <span
        className="text-xs text-center transition-colors duration-200 group-hover:text-[#c8a96e]"
        style={{ color: '#888' }}
      >
        {label}
      </span>
    </button>
  )

  const actionLink = (icon: React.ReactNode, label: string, href: string) => (
    <Link
      href={href}
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
        {icon}
      </div>
      <span
        className="text-xs text-center transition-colors duration-200 group-hover:text-[#c8a96e]"
        style={{ color: '#888' }}
      >
        {label}
      </span>
    </Link>
  )

  return (
    <div className="rounded-2xl bg-[#121212] border border-yellow-500/10 p-6 w-full h-full">
      <h3
        className="text-sm uppercase tracking-wider mb-4"
        style={{ color: '#7a7060' }}
      >
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {actionButton(
          <AddRoundedIcon fontSize="medium" />,
          'Add Session',
          onAddSession
        )}
        {actionButton(
          <SchoolRoundedIcon fontSize="medium" />,
          'Add Course',
          onAddCourse
        )}
        {actionLink(
          <CalendarMonthRoundedIcon fontSize="medium" />,
          'Timetable',
          '/timetable'
        )}
        {actionButton(
          <CenterFocusStrongRoundedIcon fontSize="medium" />,
          'Focus Mode',
          onFocusMode
        )}
      </div>

    </div>
  )
}

export default QuickActions
