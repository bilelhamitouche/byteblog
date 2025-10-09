"use server";

import { createPost } from "@/lib/queries";
import { writePostSchema } from "@/lib/zod";
import { getUserInfo } from "./auth";

export async function createPostAction(formData: FormData) {
  const userId = (await getUserInfo())?.id as string;
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");
  const published = formData.get("published");
  const validationResult = writePostSchema.safeParse({ title, image, content })
  if (!validationResult.success) return {
    errors: validationResult.error.flatten().fieldErrors,
  }
  try {
    await createPost(validationResult.data.title, validationResult.data.image, validationResult.data.content, JSON.parse(published as string) as boolean, userId as string);
  } catch (err) {
    return {
      message: err,
    }
  }
}
