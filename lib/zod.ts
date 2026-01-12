import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim(),
  password: z
    .string()
    .trim()
    .min(8, { error: "Must be at least 8 characters long" })
    .max(40, { error: "Must be at most 40 characters long" }),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, { error: "Name is required" }),
  username: z
    .string()
    .trim()
    .min(3, { error: "Name must be more than 3 characters" }),
  email: z.email({ error: "Must be a valid email address" }),
  password: z
    .string()
    .trim()
    .min(8, { error: "Must be at least 8 characters long" })
    .max(40, { error: "Must be at most 40 characters long" }),
});

export const writePostSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, { error: "Is required" })
      .max(50, { error: "Must be at most 50 characters long" }),
    image: z.url({ error: "Must be a valid url" }),
    content: z.string().trim().min(1, { error: "Is required" }),
  })
  .strict();

export const commentSchema = z.object({
  content: z.string().trim().min(1, { error: "Is required" }),
});

export const passwordChangeSchema = z.object({
  password: z
    .string()
    .trim()
    .min(8, { error: "Must be 8 characters long" })
    .max(20, { error: "Must be at most 20 characters long" }),
  new_password: z
    .string()
    .trim()
    .min(8, { error: "Must be 8 characters long" })
    .max(20, { error: "Must be at most 20 characters long" }),
  confirm_new_password: z
    .string()
    .trim()
    .min(8, { error: "Must be 8 characters long" })
    .max(20, { error: "Must be at most 20 characters long" }),
});

export const accountChangeSchema = z.object({
  name: z.string().trim().min(1, { error: "Name is required" }),
  username: z.string().trim(),
  email: z.email({ error: "Must be a valid Email address" }),
});
