'use client'

import React from 'react'
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded'

type StreakProps = {
  current?: number
  longest?: number
  activity?: boolean[]
}

const DAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const Streak: React.FC<StreakProps> = ({
  current = 5,
  longest = 12,
  activity = [true, true, false, true, true, true, false],
}) => {
  const activeCount = activity.filter(Boolean).length
  const isToday = (i: number) => i === activity.length - 1

  return (
    <div
      className="relative w-full rounded-2xl p-6 lg:p-8 overflow-hidden 
                 sm:max-w-sm md:max-w-none"
      style={{
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.06)',
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Constrained content for premium feel */}
      <div className="w-full max-w-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="uppercase tracking-widest"
            style={{
              fontSize: '10px',
              color: '#555',
              letterSpacing: '0.12em',
            }}
          >
            Consistency Streak
          </span>
          <span
            className="rounded-full px-2 py-0.5"
            style={{
              fontSize: '10px',
              color: '#c8a96e',
              background: 'rgba(200,169,110,0.08)',
              border: '1px solid rgba(200,169,110,0.15)',
              letterSpacing: '0.08em',
            }}
          >
            Active
          </span>
        </div>

        {/* Main count */}
        <div className="flex items-start gap-3 mb-6">
          <WhatshotRoundedIcon
            className="mt-1.5"
            style={{
              color: '#fb923c',
              fontSize: 28,
              filter: 'drop-shadow(0 0 8px rgba(251,146,60,0.6))',
              animation: 'flicker 1.8s ease-in-out infinite',
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '64px',
                fontWeight: 700,
                lineHeight: 0.9,
                color: '#f5f0e8',
                letterSpacing: '-2px',
              }}
            >
              {current}
            </div>
            <div
              className="mt-1 uppercase tracking-widest"
              style={{ fontSize: '11px', color: '#444' }}
            >
              days in a row
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.05)',
            marginBottom: '20px',
          }}
        />

        {/* Heatmap */}
        <div className="mb-5">
          <div
            className="uppercase mb-2.5"
            style={{
              fontSize: '9px',
              color: '#3a3a3a',
              letterSpacing: '0.12em',
            }}
          >
            Last 7 days
          </div>

          <div className="flex gap-2">
            {activity.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  style={{
                    width: 'clamp(28px, 3vw, 40px)',
                    height: 'clamp(28px, 3vw, 40px)',
                    borderRadius: 6,
                    transition: 'transform 0.15s',
                    background: day
                      ? isToday(i)
                        ? 'linear-gradient(145deg, #eab308, #d97706)'
                        : 'linear-gradient(145deg, #d4a04a, #c8862a)'
                      : '#1c1c1c',
                    border: day
                      ? 'none'
                      : '1px solid rgba(255,255,255,0.04)',
                    boxShadow: day
                      ? isToday(i)
                        ? '0 0 14px rgba(234,179,8,0.45), 0 2px 6px rgba(0,0,0,0.3)'
                        : '0 0 10px rgba(200,169,110,0.35), 0 2px 6px rgba(0,0,0,0.3)'
                      : 'none',
                  }}
                />
                <span
                  style={{
                    fontSize: '9px',
                    color: '#333',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {DAY_LABELS[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between lg:justify-around">
          {/* Best streak */}
          <div className="flex flex-col gap-0.5">
            <span
              className="uppercase"
              style={{
                fontSize: '9px',
                color: '#333',
                letterSpacing: '0.12em',
              }}
            >
              Best streak
            </span>
            <div className="flex items-baseline gap-1">
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#c8a96e',
                  lineHeight: 1,
                  letterSpacing: '-0.5px',
                }}
              >
                {longest}
              </span>
              <span
                style={{
                  fontSize: '9px',
                  color: '#444',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                days
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: '1px',
              height: '32px',
              background: 'rgba(255,255,255,0.05)',
            }}
          />

          {/* This week */}
          <div className="flex flex-col gap-0.5 items-end">
            <span
              className="uppercase"
              style={{
                fontSize: '9px',
                color: '#333',
                letterSpacing: '0.12em',
              }}
            >
              This week
            </span>
            <div className="flex items-baseline gap-1">
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#c8a96e',
                  lineHeight: 1,
                  letterSpacing: '-0.5px',
                }}
              >
                {activeCount}
              </span>
              <span
                style={{
                  fontSize: '9px',
                  color: '#444',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                / 7
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fonts + Animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700&display=swap');

        @keyframes flicker {
          0%, 100% { transform: scaleY(1) rotate(-2deg); opacity: 1; }
          25% { transform: scaleY(1.07) rotate(1deg); opacity: 0.9; }
          50% { transform: scaleY(0.97) rotate(-1deg); opacity: 1; }
          75% { transform: scaleY(1.04) rotate(2deg); opacity: 0.85; }
        }
      `}</style>
    </div>
  )
}

export default Streak