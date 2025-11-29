"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { passwordChangeSchema } from "@/lib/zod";
import { headers } from "next/headers";

export async function changePasswordAction(formData: FormData) {
  const password = formData.get("password") as string;
  const new_password = formData.get("new_password") as string;
  const confirm_new_password = formData.get("confirm_new_password") as string;
  try {
    const passwordChangeSchemaValidation = passwordChangeSchema.safeParse({
      password,
      new_password,
      confirm_new_password,
    });
    if (!passwordChangeSchemaValidation.success) {
      return {
        errors: passwordChangeSchemaValidation.error.flatten().fieldErrors,
      };
    }
    await auth.api.changePassword({
      body: {
        currentPassword: passwordChangeSchemaValidation.data?.password,
        newPassword: passwordChangeSchemaValidation.data?.new_password,
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
