import { z } from "zod"

export const signInSchema = z.object({
  email: z.string({ message: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ message: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const registerSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name is required").max(100),
  email: z.string({ message: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ message: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const courseSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name is required").max(100),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    message: "Priority must be LOW, MEDIUM, or HIGH",
  }),
  allocatedTime: z.number({
    message: "Allocated time must be a number",
  })
    .min(15, "Time must be at least 15 minutes")
    .max(1440, "Time cannot exceed 24 hours"),
})