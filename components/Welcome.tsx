'use client'

import React from 'react'
import { Typography } from '@mui/material'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'

type WelcomeProps = {
  name?: string
}

const Welcome: React.FC<WelcomeProps> = ({ name = 'Student' }) => {
  const getGreeting = () => {
    const hour = new Date().getHours()

    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const getIcon = () => {
    const hour = new Date().getHours()

    if (hour < 12) return <LightModeRoundedIcon className="text-yellow-500" />
    if (hour < 18) return <WbSunnyRoundedIcon className="text-yellow-400" />
    return <NightsStayRoundedIcon className="text-yellow-300" />
  }

  const formattedDate = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="w-full rounded-2xl bg-[#121212] border border-yellow-500/10 p-6 shadow-md flex flex-col gap-3">
      
      {/* Top Row */}
      <div className="flex items-center gap-3">
        {getIcon()}
        <Typography
          variant="h5"
          className="text-white font-semibold"
        >
          {getGreeting()}, {name}.
        </Typography>
      </div>

      {/* Date */}
      <Typography
        variant="body2"
        className="text-gray-400"
      >
        {formattedDate}
      </Typography>

      {/* Subtext / Motivation */}
      <Typography
        variant="body1"
        className="text-gray-300 mt-2"
      >
        Stay consistent. Every session brings you closer to mastery.
      </Typography>
    </div>
  )
}

export default Welcome