"use server";
import "server-only";
import { auth } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/zod";
import { APIError } from "better-auth/api";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const result = loginSchema.safeParse({ email, password });
    if (!result.success)
      return {
        errors: result.error.flatten().fieldErrors,
      };
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (err) {
    if (err instanceof APIError) {
      return {
        message: err.message,
      };
    }
  }
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const result = registerSchema.safeParse({ name, email, password });
    if (!result.success)
      return {
        errors: result.error.flatten().fieldErrors,
      };
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
  } catch (err) {
    if (err instanceof APIError) {
      return {
        message: err.message,
      };
    }
  }
}
