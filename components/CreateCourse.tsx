"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grow,
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

/** Dialog + backdrop timing; Grow fades/scales the paper stack in sync with the scrim. */
const dialogTransitionMs = { enter: 420, exit: 240 } as const;
const dialogEasing = {
  enter: "cubic-bezier(0.22, 1, 0.36, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
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
    <Dialog
      open={open}
      onClose={() => onClose()}
      maxWidth="sm"
      fullWidth
      slots={{ transition: Grow }}
      transitionDuration={dialogTransitionMs}
      slotProps={{
        transition: {
          easing: dialogEasing,
        },
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          },
        },
        paper: {
          sx: {
            backgroundColor: "#0f0f0f",
            backgroundImage: "none",
            border: "1px solid rgba(200, 169, 110, 0.15)",
            borderRadius: 2,
            boxShadow:
              "0 0 0 1px rgba(200, 169, 110, 0.06), 0 24px 80px -12px rgba(0, 0, 0, 0.75)",
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
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
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
  );
}
