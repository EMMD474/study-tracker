"use client"

import { Fab} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import CreateCourse from "@/components/CreateCourse";
import TopNav from "@/components/TopNav";
import { courseApi } from "@/lib/api";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [openCreateCourse, setOpenCreateCourse] = useState(false)
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCourses = async () => {
    try {
      const data = await courseApi.list()
      setCourses(data)
    } catch (error) {
      console.error("Failed to fetch courses:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleCreateCourse = () => {
    setOpenCreateCourse(true)
  }
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <TopNav />
      <div className="flex min-h-0 w-full flex-col py-6 lg:py-8">
        {children}
      </div>
      <CreateCourse
        open={openCreateCourse}
        onClose={() => setOpenCreateCourse(false)}
        onSuccess={fetchCourses}
      />
      <Fab
        color="secondary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleCreateCourse}
      >
        <Add />
      </Fab>
    </main>
  );
}
