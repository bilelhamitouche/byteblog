"use server";

import { APIError } from "better-auth/api";
import { accountChangeSchema } from "@/lib/zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function accountChangeAction(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  try {
    const accountChangeValidation = accountChangeSchema.safeParse({
      name,
      email,
    });
    if (!accountChangeValidation.success) {
      return {
        errors: accountChangeValidation.error,
      };
    }
    await auth.api.updateUser({
      body: {
        name: accountChangeValidation.data.name,
      },
      headers: await headers(),
    });
    await auth.api.changeEmail({
      body: {
        newEmail: accountChangeValidation.data.email,
      },
      headers: await headers(),
    });
  } catch (err) {
    if (err instanceof APIError) {
      return {
        message: err.message,
      };
    }
  }
}

export async function deleteAccountAction(formData: FormData) {
  const password = formData.get("password") as string;
  try {
    await auth.api.deleteUser({
      body: {
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
