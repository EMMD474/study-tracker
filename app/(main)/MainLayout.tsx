"use client"

import { Fab} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import CreateCourse from "@/components/CreateCourse";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [openCreateCourse, setOpenCreateCourse] = useState(false)
  const handleCreateCourse = () => {
    setOpenCreateCourse(true)
  }
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <div className="mx-auto box-border w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
        {children}
      </div>
      <CreateCourse
        open={openCreateCourse}
        onClose={() => setOpenCreateCourse(false)}
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
