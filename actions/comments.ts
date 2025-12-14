"use server";

import { createComment, deleteComment } from "@/lib/queries";
import { getUserInfo } from "./auth";
import { commentSchema } from "@/lib/zod";

export async function createCommentAction(formData: FormData) {
  const content = formData.get("content");
  const postId = formData.get("postId");
  const parentId = formData.get("parentId");
  const user = await getUserInfo();
  const validationResult = commentSchema.safeParse({ content });
  if (!validationResult.success) {
    return {
      errors: validationResult.error,
    };
  }
  try {
    await createComment(
      content as string,
      user?.id as string,
      postId as string,
      parentId,
    );
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }
  }
}

export async function deleteCommentAction(formData: FormData) {
  const id = formData.get("id");
  try {
    await deleteComment(id as string);
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }
  }
}
