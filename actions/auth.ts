"use server";
import "server-only";
import { auth } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/zod";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  try {
    const result = loginSchema.safeParse({ username, password });
    if (!result.success)
      return {
        errors: result.error,
      };
    await auth.api.signInUsername({
      body: {
        username: result.data.username,
        password: result.data.password,
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
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const result = registerSchema.safeParse({
      name,
      username,
      email,
      password,
    });
    if (!result.success) {
      return {
        errors: result.error,
      };
    }
    await auth.api.signUpEmail({
      body: {
        name: result.data.name,
        username: result.data.username,
        email: result.data.email,
        password: result.data.password,
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

export async function googleLoginAction() {
  try {
    auth.api.signInSocial({
      body: {
        provider: "google",
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

export async function gitHubLoginAction() {
  try {
    auth.api.signInSocial({
      body: {
        provider: "github",
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

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/login");
}

export async function getUserInfo() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
}

export async function redirectUnauthenticated() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  !session && redirect("/login");
}
