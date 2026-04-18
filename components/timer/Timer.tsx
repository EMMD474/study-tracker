'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import PauseRoundedIcon from '@mui/icons-material/PauseRounded'
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded'
import { Typography, Slider, Button, IconButton } from '@mui/material'

type TimerState = 'IDLE' | 'FOCUSING' | 'BREAKING' | 'PAUSED'

interface TimerStep {
  label: string
  duration: number // in seconds
  type: 'FOCUS' | 'BREAK'
}

export default function Timer() {
  const [totalSessionTime, setTotalSessionTime] = useState(60) // minutes
  const [breakTime, setBreakTime] = useState(5) // minutes
  const [steps, setSteps] = useState<TimerStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [timerState, setTimerState] = useState<TimerState>('IDLE')
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize steps when setup changes
  useEffect(() => {
    if (timerState === 'IDLE') {
      const halfSession = (totalSessionTime * 60) / 2
      const breakSec = breakTime * 60
      
      const newSteps: TimerStep[] = [
        { label: 'Focus Session 1', duration: halfSession, type: 'FOCUS' },
        { label: 'Rest Break', duration: breakSec, type: 'BREAK' },
        { label: 'Focus Session 2', duration: halfSession, type: 'FOCUS' },
      ]
      
      setSteps(newSteps)
      setTimeLeft(newSteps[0].duration)
    }
  }, [totalSessionTime, breakTime, timerState])

  useEffect(() => {
    if ((timerState === 'FOCUSING' || timerState === 'BREAKING') && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && (timerState === 'FOCUSING' || timerState === 'BREAKING')) {
      handleNextStep()
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [timerState, timeLeft])

  const handleStart = () => {
    const currentStep = steps[currentStepIndex]
    setTimerState(currentStep.type === 'FOCUS' ? 'FOCUSING' : 'BREAKING')
  }

  const handlePause = () => {
    setTimerState('PAUSED')
  }

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setTimerState('IDLE')
    setCurrentStepIndex(0)
    setTimeLeft(steps[0]?.duration || 0)
  }

  const handleNextStep = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    
    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1
      setCurrentStepIndex(nextIndex)
      setTimeLeft(steps[nextIndex].duration)
      setTimerState(steps[nextIndex].type === 'FOCUS' ? 'FOCUSING' : 'BREAKING')
      
      // Play a sound or notify?
      if (typeof window !== 'undefined') {
        const audio = new Audio('/notification.mp3') // Fallback if exists
        audio.play().catch(() => {}) 
      }
    } else {
      setTimerState('IDLE')
      setCurrentStepIndex(0)
      setTimeLeft(steps[0].duration)
      alert('All sessions completed! Well done.')
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = steps[currentStepIndex] 
    ? ((steps[currentStepIndex].duration - timeLeft) / steps[currentStepIndex].duration) * 100 
    : 0

  return (
    <div className="flex flex-col items-center">
      {/* Timer Display */}
      <div className="relative flex h-80 w-80 items-center justify-center rounded-full border-8 border-yellow-500/10 bg-[#0f0f0f] shadow-[0_0_60px_-15px_rgba(200,169,110,0.15)]">
        {/* Progress Ring Overlay */}
        <svg className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            cx="160"
            cy="160"
            r="152"
            fill="transparent"
            stroke="url(#timerGradient)"
            strokeWidth="8"
            strokeDasharray={955}
            strokeDashoffset={955 - (955 * progress) / 100}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c8a96e" />
              <stop offset="100%" stopColor="#e8c98e" />
            </linearGradient>
          </defs>
        </svg>

        <div className="z-10 text-center">
          <motion.div
            key={timeLeft}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-1"
          >
            <Typography variant="h2" className="font-light tracking-tighter text-[#e8e6e0]">
              {formatTime(timeLeft)}
            </Typography>
          </motion.div>
          <Typography variant="overline" className="font-bold tracking-[0.2em] text-[#c8a96e]">
            {steps[currentStepIndex]?.label || 'Setup'}
          </Typography>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-12 flex items-center gap-8">
        <IconButton
          onClick={handleReset}
          className="h-12 w-12 border border-[#c8a96e]/20 text-[#7a7060] transition-all hover:bg-[#c8a96e]/10 hover:text-[#e8e6e0]"
        >
          <ReplayRoundedIcon />
        </IconButton>

        <button
          onClick={timerState === 'FOCUSING' || timerState === 'BREAKING' ? handlePause : handleStart}
          className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-[#c8a96e] text-[#0a0a0a] shadow-[0_0_40px_-10px_rgba(200,169,110,0.4)] transition-all hover:scale-105"
        >
          {timerState === 'FOCUSING' || timerState === 'BREAKING' ? (
            <PauseRoundedIcon fontSize="large" />
          ) : (
            <PlayArrowRoundedIcon fontSize="large" />
          )}
        </button>

        <IconButton
          onClick={handleNextStep}
          disabled={currentStepIndex >= steps.length - 1}
          className="h-12 w-12 border border-[#c8a96e]/20 text-[#7a7060] transition-all hover:bg-[#c8a96e]/10 hover:text-[#e8e6e0] disabled:opacity-30"
        >
          <SkipNextRoundedIcon />
        </IconButton>
      </div>

      {/* Settings (Only in IDLE or PAUSED) */}
      <AnimatePresence>
        {(timerState === 'IDLE' || timerState === 'PAUSED') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-16 w-full max-w-md rounded-2xl border border-yellow-500/10 bg-[#0f0f0f] p-8"
          >
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <Typography className="text-sm font-medium text-[#7a7060]">Total Session Time</Typography>
                <Typography className="font-semibold text-[#c8a96e]">{totalSessionTime} minutes</Typography>
              </div>
              <Slider
                value={totalSessionTime}
                onChange={(_, v) => setTotalSessionTime(v as number)}
                min={10}
                max={180}
                step={5}
                sx={{
                  color: '#c8a96e',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#c8a96e',
                    '&:hover': { boxShadow: '0 0 0 8px rgba(200, 169, 110, 0.16)' },
                  },
                }}
              />
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <Typography className="text-sm font-medium text-[#7a7060]">Break duration</Typography>
                <Typography className="font-semibold text-[#c8a96e]">{breakTime} minutes</Typography>
              </div>
              <Slider
                value={breakTime}
                onChange={(_, v) => setBreakTime(v as number)}
                min={1}
                max={30}
                sx={{
                  color: '#c8a96e',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#c8a96e',
                    '&:hover': { boxShadow: '0 0 0 8px rgba(200, 169, 110, 0.16)' },
                  },
                }}
              />
            </div>

            <div className="mt-8 border-t border-yellow-500/5 pt-6 text-center">
              <Typography className="text-xs tracking-widest text-[#5e5a52] uppercase">
                Plan: {totalSessionTime / 2}min Focus • {breakTime}min Break • {totalSessionTime / 2}min Focus
              </Typography>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
