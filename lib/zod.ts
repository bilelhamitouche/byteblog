import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim(),
  password: z
    .string()
    .trim()
    .min(8, { message: "Must be at least 8 characters long" })
    .max(40, { message: "Must be at most 40 characters long" }),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  username: z
    .string()
    .trim()
    .min(3, { message: "Name must be more than 3 characters" }),
  email: z.string().trim().email({ message: "Must be a valid email address" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Must be at least 8 characters long" })
    .max(40, { message: "Must be at most 40 characters long" }),
});
