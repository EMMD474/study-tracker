'use client'

import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import { Typography, IconButton, Tooltip } from '@mui/material'

interface Material {
  id: string
  name: string
  type: 'pdf' | 'doc' | 'link' | 'image'
  size?: string
  uploadedAt: string
}

interface MaterialListProps {
  materials: Material[]
  onDelete?: (id: string) => void
  onOpen?: (id: string) => void
}

const getFileIcon = (type: Material['type']) => {
  switch (type) {
    case 'pdf':
      return <PictureAsPdfRoundedIcon sx={{ color: '#ff4d4d' }} />
    case 'doc':
      return <DescriptionRoundedIcon sx={{ color: '#4d94ff' }} />
    case 'link':
      return <OpenInNewRoundedIcon sx={{ color: '#c8a96e' }} />
    default:
      return <DescriptionRoundedIcon sx={{ color: '#7a7060' }} />
  }
}

const MaterialList: React.FC<MaterialListProps> = ({ 
  materials, 
  onDelete, 
  onOpen 
}) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between px-2 mb-2">
        <Typography variant="overline" className="text-[#7a7060] font-bold tracking-[0.2em]">
          Course Resources
        </Typography>
        <Typography variant="caption" className="text-[#4a453e]">
          {materials.length} Items
        </Typography>
      </div>

      <AnimatePresence mode='popLayout'>
        {materials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl bg-white/[0.01] border border-dashed border-white/5"
          >
            <Typography className="text-[#5a554e] text-sm italic">
              No materials uploaded yet.
            </Typography>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {materials.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                className="group flex items-center gap-4 p-4 rounded-xl bg-[#0f0f0f] border border-white/5 transition-all duration-300 hover:border-primary/20 hover:bg-primary/[0.02]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] text-primary transition-colors group-hover:bg-primary/10">
                  {getFileIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <Typography className="text-[#e8e6e0] font-medium text-sm truncate">
                    {item.name}
                  </Typography>
                  <div className="flex items-center gap-3 mt-0.5">
                    {item.size && (
                      <Typography className="text-[#6a655c] text-[10px] font-mono">
                        {item.size}
                      </Typography>
                    )}
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <Typography className="text-[#6a655c] text-[10px]">
                      {item.uploadedAt}
                    </Typography>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Tooltip title="View Material" arrow>
                    <IconButton 
                      size="small" 
                      onClick={() => onOpen?.(item.id)}
                      className="text-[#7a7060] hover:text-primary transition-colors"
                    >
                      <OpenInNewRoundedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <IconButton 
                      size="small" 
                      onClick={() => onDelete?.(item.id)}
                      className="text-[#7a7060] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <DeleteOutlineRoundedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                  <IconButton size="small" className="text-[#4a453e]">
                    <MoreVertRoundedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MaterialList
