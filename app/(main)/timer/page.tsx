'use client'

import React from 'react'
import Timer from '@/components/timer/Timer'
import { Typography } from '@mui/material'
import { motion } from 'motion/react'

export default function TimerPage() {
  return (
    <div className="flex-1 overflow-auto p-6 lg:p-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="overline"
              className="mb-2 block font-bold tracking-[0.3em] text-[#c8a96e]"
            >
              Focus Mode
            </Typography>
            <Typography
              variant="h3"
              className="mb-4 font-light tracking-tight text-[#e8e6e0]"
            >
              Deep Work Timer
            </Typography>
            <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-[#c8a96e]/30 to-transparent" />
          </motion.div>
        </header>

        <div className="flex flex-col items-center justify-center">
          <Timer />
        </div>

        <section className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-yellow-500/5 bg-[#0f0f0f] p-8 transition-all hover:border-yellow-500/10">
            <Typography variant="h6" className="mb-4 text-[#e8e6e0]">
              What is Deep Work?
            </Typography>
            <Typography className="text-sm leading-relaxed text-[#7a7060]">
              Deep work is the ability to focus without distraction on a cognitively demanding task. It&apos;s a skill that allows you to quickly master complicated information and produce better results in less time.
            </Typography>
          </div>
          <div className="rounded-2xl border border-yellow-500/5 bg-[#0f0f0f] p-8 transition-all hover:border-yellow-500/10">
            <Typography variant="h6" className="mb-4 text-[#e8e6e0]">
              The Study Cycle
            </Typography>
            <Typography className="text-sm leading-relaxed text-[#7a7060]">
              This timer uses a modified Pomodoro technique: splitting your total study time into two equal focus sessions separated by a short rejuvenating break.
            </Typography>
          </div>
        </section>
      </div>
    </div>
  )
}
