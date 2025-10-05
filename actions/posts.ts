"use server";

import { createDraft, createPost } from "@/lib/queries";
import { writePostSchema } from "@/lib/zod";
import { getUserInfo } from "./auth";

export async function createPostAction(formData: FormData) {
  const userId = (await getUserInfo())?.id as string;
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");
  const draftId = formData.get("draftId");
  const validationResult = writePostSchema.safeParse({ title, image, content })
  if (!validationResult.success) return {
    errors: validationResult.error.flatten().fieldErrors,
  }
  try {
    await createPost(validationResult.data.image, validationResult.data.image, validationResult.data.content, userId as string, draftId as string);
  } catch (err) {
    return {
      message: err,
    }
  }
}

export async function createDraftAction(formData: FormData) {
  const userId = (await getUserInfo())?.id as string;
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");
  const validationResult = writePostSchema.safeParse({ title, image, content })
  if (!validationResult.success) return {
    errors: validationResult.error.flatten().fieldErrors,
  }
  try {
    await createDraft(validationResult.data.title, validationResult.data.image, validationResult.data.content, userId as string);
  } catch (err) {
    return {
      message: err,
    }
  }
}
