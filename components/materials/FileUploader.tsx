'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, Typography, LinearProgress, IconButton } from '@mui/material'

interface FileUploaderProps {
  onUpload?: (files: File[]) => void
  maxSizeMB?: number
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  onUpload, 
  maxSizeMB = 10 
}) => {
  const [isDragActive, setIsDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      handleFiles(droppedFiles)
    }
  }

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => file.size <= maxSizeMB * 1024 * 1024)
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles])
      simulateUpload()
    }
  }

  const simulateUpload = () => {
    setUploading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          setCompleted(true)
          setTimeout(() => setCompleted(false), 3000)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full space-y-4">
      <motion.div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer group rounded-2xl border-2 border-dashed p-8 transition-all duration-300 flex flex-col items-center justify-center gap-4
          ${isDragActive 
            ? 'border-primary bg-primary/10 shadow-[0_0_30px_rgba(200,169,110,0.15)]' 
            : 'border-white/10 hover:border-primary/40 hover:bg-white/[0.02]'}`}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
        />

        <div className="relative">
          <motion.div
            initial={false}
            animate={{ 
              scale: isDragActive ? 1.2 : 1,
              color: isDragActive ? '#c8a96e' : '#7a7060'
            }}
            className="p-4 rounded-full bg-white/[0.03] border border-white/5"
          >
            <CloudUploadRoundedIcon sx={{ fontSize: 40 }} />
          </motion.div>
          
          <AnimatePresence>
            {completed && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-1 -right-1 bg-green-500 rounded-full border-2 border-[#0a0a0a]"
              >
                <CheckCircleRoundedIcon sx={{ fontSize: 20, color: '#fff' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center">
          <Typography variant="h6" className="text-[#e8e6e0] font-medium text-sm lg:text-base">
            Click to upload or drag and drop
          </Typography>
          <Typography variant="body2" className="text-[#7a7060] mt-1 text-xs">
            PDF, DOC, PNG up to {maxSizeMB}MB
          </Typography>
        </div>

        {uploading && (
          <Box className="w-full max-w-xs mt-2">
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{
                height: 4,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.05)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'var(--primary)',
                  borderRadius: 2,
                }
              }}
            />
            <Typography variant="caption" className="text-primary mt-1 block text-right">
              {progress}%
            </Typography>
          </Box>
        )}
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            <Typography variant="overline" className="text-[#7a7060] font-bold tracking-widest pl-2">
              Ready to upload ({files.length})
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {files.map((file, idx) => (
                <motion.div
                  key={`${file.name}-${idx}`}
                  layout
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 group"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <InsertDriveFileRoundedIcon sx={{ fontSize: 20 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Typography className="text-[#e8e6e0] text-xs font-medium truncate">
                      {file.name}
                    </Typography>
                    <Typography className="text-[#7a7060] text-[10px]">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                  </div>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(idx)
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    sx={{ color: '#7a7060' }}
                  >
                    <CloseRoundedIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FileUploader
