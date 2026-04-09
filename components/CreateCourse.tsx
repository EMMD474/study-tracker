"use client";
import { motion } from "motion/react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";

/** Matches globals.css Black & Gold — MUI defaults assume a light paper. */
const formTextFieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "var(--foreground)",
    backgroundColor: "var(--input)",
    "& fieldset": {
      borderColor: "rgba(200, 169, 110, 0.28)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(200, 169, 110, 0.45)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary)",
      borderWidth: 1,
    },
    "&.Mui-error fieldset": {
      borderColor: "rgba(220, 90, 90, 0.85)",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "var(--foreground)",
    caretColor: "var(--primary)",
    "&::placeholder": {
      color: "var(--muted-foreground)",
      opacity: 1,
    },
  },
  "& .MuiInputLabel-root": {
    color: "var(--muted-foreground)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--primary)",
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "rgba(220, 120, 120, 0.95)",
  },
  "& .MuiFormHelperText-root": {
    color: "var(--muted-foreground)",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "rgba(220, 120, 120, 0.95)",
  },
} as const;

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
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
    >
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
        <DialogContent sx={{ pt: 3, color: "var(--foreground)" }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <TextField
                label="Course name"
                name="name"
                required
                fullWidth
                autoFocus
                variant="outlined"
                sx={formTextFieldSx}
            />
            <TextField
                label="Course description"
                name="description"
                required
                fullWidth
                multiline
                minRows={3}
                variant="outlined"
                sx={formTextFieldSx}
            />
            <Button
                type="submit"
                variant="contained"
                disableElevation
                sx={{
                mt: 1,
                py: 1.25,
                fontWeight: 600,
                textTransform: "none",
                bgcolor: "var(--primary)",
                color: "var(--primary-foreground)",
                "&:hover": {
                    bgcolor: "var(--primary)",
                    filter: "brightness(1.08)",
                },
                }}
            >
                Create course
            </Button>
            </form>
        </DialogContent>
        </Dialog>
    </motion.div>
  );
}
