"use server";

import { createDraft, createPost, updateDraft } from "@/lib/queries";
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
    await createPost(validationResult.data.title, validationResult.data.image, validationResult.data.content, userId as string, draftId as string);
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
    await createDraft(validationResult.data.title, validationResult.data.image, validationResult.data.content, userId);
  } catch (err) {
    return {
      message: err,
    }
  }
}

export async function editDraftAction(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const image = formData.get("image") as string;
  const content = formData.get("content") as string;
  try {
    await updateDraft(id, title, image, content);
  } catch (err) {
    return {
      message: err,
    }
  }
}
