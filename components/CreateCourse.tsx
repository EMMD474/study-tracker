import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grow,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { courseApi } from "@/lib/api";

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

const dialogTransitionMs = { enter: 420, exit: 240 } as const;
const dialogEasing = {
  enter: "cubic-bezier(0.22, 1, 0.36, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
} as const;

type CreateCourseProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function CreateCourse({ open, onClose, onSuccess }: CreateCourseProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const priority = formData.get("priority") as string;
    const allocatedTime = parseInt(formData.get("allocatedTime") as string);

    try {
      await courseApi.create({ name, priority, allocatedTime });
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error("Failed to create course:", err);
      setError(err.response?.data?.error || "Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => !loading && onClose()}
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
            backgroundColor: "rgba(37, 37, 37, 0.55)",
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
          disabled={loading}
          aria-label="Close"
          sx={{ color: "var(--muted-foreground)" }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 3, color: "var(--foreground)" }}>
        {error && (
          <div className="mb-4 rounded border border-red-900/50 bg-red-900/10 p-3 text-sm text-red-400">
            {typeof error === "object" ? JSON.stringify(error) : error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5">
          <TextField
            label="Course name"
            name="name"
            required
            fullWidth
            autoFocus
            disabled={loading}
            variant="outlined"
            sx={formTextFieldSx}
          />
          
          <div className="flex gap-4">
            <FormControl fullWidth required sx={formTextFieldSx}>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                name="priority"
                label="Priority"
                defaultValue="MEDIUM"
                disabled={loading}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#0f0f0f",
                      border: "1px solid rgba(200, 169, 110, 0.15)",
                      color: "var(--foreground)",
                    },
                  },
                }}
              >
                <MenuItem value="LOW">Low</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="HIGH">High</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Allocated Time (mins)"
              name="allocatedTime"
              type="number"
              required
              fullWidth
              disabled={loading}
              defaultValue={60}
              variant="outlined"
              sx={formTextFieldSx}
              inputProps={{ min: 15, max: 1440 }}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            disableElevation
            disabled={loading}
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              bgcolor: "var(--primary)",
              color: "var(--primary-foreground)",
              "&:hover": {
                bgcolor: "var(--primary)",
                filter: "brightness(1.08)",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(200, 169, 110, 0.12)",
                color: "rgba(200, 169, 110, 0.35)",
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Create course"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
