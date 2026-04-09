"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";

type CreateCourseProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateCourse({ open, onClose }: CreateCourseProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    console.log(name, description);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      maxWidth="sm"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          },
        },
        paper: {
          sx: {
            backgroundColor: "#0f0f0f",
            backgroundImage: "none",
            border: "1px solid rgba(200, 169, 110, 0.15)",
            borderRadius: 2,
          },
        },
      }}
    >
      <DialogTitle
        id="create-course-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 1,
          color: "var(--foreground)",
          borderBottom: "1px solid rgba(200, 169, 110, 0.12)",
        }}
      >
        Create course
        <IconButton
          type="button"
          onClick={() => onClose()}
          aria-label="Close"
          sx={{ color: "var(--muted-foreground)" }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField label="Course Name" name="name" required fullWidth autoFocus />
          <TextField
            label="Course Description"
            name="description"
            required
            fullWidth
            multiline
            minRows={3}
          />
          <Button type="submit" variant="contained" color="secondary" sx={{ mt: 1 }}>
            Create Course
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
