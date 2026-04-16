"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CreateCourse from "@/components/CreateCourse";
import FileUploader from "@/components/materials/FileUploader";
import MaterialList from "@/components/materials/MaterialList";
import { 
  Button, 
  Typography, 
  Box, 
  Breadcrumbs, 
  Link as MuiLink,
  Chip
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const MOCK_COURSES = [
  { 
    id: "1", 
    name: "Advanced Databases", 
    description: "Deep dive into query optimization, indexing, and distributed systems.",
    priority: "HIGH",
    count: 12
  },
  { 
    id: "2", 
    name: "Computer Security", 
    description: "Fundamentals of network security, cryptography, and ethical hacking.",
    priority: "MEDIUM",
    count: 8
  },
  { 
    id: "3", 
    name: "Human Computer Interaction", 
    description: "Designing user-centric interfaces and studying interaction patterns.",
    priority: "LOW",
    count: 5
  }
];

const MOCK_MATERIALS = [
  { id: "m1", name: "Lecture 1: Intro to SQL.pdf", type: "pdf" as const, size: "2.4 MB", uploadedAt: "2 days ago" },
  { id: "m2", name: "Relational Algebra Notes.doc", type: "doc" as const, size: "1.1 MB", uploadedAt: "Yesterday" },
  { id: "m3", name: "Database Design Guidelines.pdf", type: "pdf" as const, size: "4.5 MB", uploadedAt: "Just now" },
];

export default function CoursesPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  const selectedCourse = MOCK_COURSES.find(c => c.id === selectedCourseId);

  return (
    <div className="min-h-0 flex-1 p-6 lg:p-10 overflow-auto bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Breadcrumbs 
              separator={<ArrowForwardIosRoundedIcon sx={{ fontSize: 8, color: '#7a7060' }} />}
              sx={{ mb: 1 }}
            >
              <Typography className="text-[#7a7060] text-xs font-medium tracking-widest uppercase">
                Dashboard
              </Typography>
              <Typography className="text-primary text-xs font-medium tracking-widest uppercase">
                Academic Courses
              </Typography>
            </Breadcrumbs>
            <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-[#e8e6e0]">
              Course Management
            </h1>
            <p className="text-[#a09880] text-sm max-w-xl">
              Organize your academic subjects, allocate study time, and manage resources in one centralized gold-standard hub.
            </p>
          </div>
          
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => setIsAddingCourse(true)}
            sx={{
              bgcolor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              py: 1.5,
              px: 3,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'var(--primary)',
                filter: 'brightness(1.1)',
              }
            }}
          >
            New Course
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Course List */}
          <div className="lg:col-span-4 space-y-4">
            <Typography variant="overline" className="text-[#7a7060] font-bold tracking-[0.2em] px-2">
              Active Subject
            </Typography>
            
            <div className="space-y-3">
              {MOCK_COURSES.map((course) => (
                <motion.div
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`group cursor-pointer p-4 rounded-2xl border transition-all duration-300 ${
                    selectedCourseId === course.id 
                      ? 'bg-primary/5 border-primary shadow-[0_0_20px_rgba(200,169,110,0.1)]' 
                      : 'bg-[#0f0f0f] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <Typography className="text-[#e8e6e0] font-medium leading-tight">
                        {course.name}
                      </Typography>
                      <div className="flex items-center gap-2">
                        <Chip 
                          label={course.priority} 
                          size="small"
                          sx={{ 
                            height: 16, 
                            fontSize: 8, 
                            fontWeight: 700,
                            bgcolor: course.priority === 'HIGH' ? 'rgba(180, 50, 50, 0.15)' : 'rgba(255,255,255,0.05)',
                            color: course.priority === 'HIGH' ? '#ff4d4d' : '#888',
                            border: '1px solid rgba(255,255,255,0.05)'
                          }}
                        />
                        <Typography className="text-[#6a655c] text-[10px]">
                          {course.count} Resources
                        </Typography>
                      </div>
                    </div>
                    <FolderOpenRoundedIcon 
                      sx={{ 
                        color: selectedCourseId === course.id ? '#c8a96e' : '#3a3830',
                        fontSize: 20
                      }} 
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Materials */}
          <div className="lg:col-span-8 min-h-[500px]">
            <AnimatePresence mode="wait">
              {!selectedCourseId ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  key="empty"
                  className="h-full flex flex-col items-center justify-center p-12 rounded-3xl bg-white/[0.01] border border-dashed border-white/5 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 text-[#3a3830]">
                    <FolderOpenRoundedIcon sx={{ fontSize: 32 }} />
                  </div>
                  <Typography className="text-[#e8e6e0] font-medium text-lg">
                    Select a course to manage materials
                  </Typography>
                  <Typography className="text-[#7a7060] text-sm mt-2 max-w-xs">
                    View your uploaded PDFs, notes, and study resources associated with your subjects here.
                  </Typography>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key={selectedCourseId}
                  className="space-y-8"
                >
                  {/* Selected Course Header */}
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-[#11100f] to-[#0a0a0a] border border-white/5 shadow-2xl">
                    <Typography variant="h4" className="text-[#e8e6e0] font-light tracking-tight mb-2">
                      {selectedCourse?.name}
                    </Typography>
                    <Typography className="text-[#a09880] text-sm mb-6 leading-relaxed">
                      {selectedCourse?.description}
                    </Typography>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <MaterialList 
                          materials={MOCK_MATERIALS}
                          onDelete={(id) => console.log('Delete', id)}
                          onOpen={(id) => console.log('Open', id)}
                        />
                      </div>
                      <div className="space-y-6">
                        <Typography variant="overline" className="text-[#7a7060] font-bold tracking-[0.2em] px-2 block mb-3">
                          Upload Resources
                        </Typography>
                        <FileUploader />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      <CreateCourse 
        open={isAddingCourse} 
        onClose={() => setIsAddingCourse(false)} 
      />
    </div>
  );
}
