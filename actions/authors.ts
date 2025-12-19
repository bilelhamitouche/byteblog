"use server";

import { createOrEditProfile, toggleFollowAuthor } from "@/lib/queries";
import { getUserInfo } from "./auth";
import { refresh, revalidatePath } from "next/cache";

export async function toggleFollowAuthorAction(
  authorId: string,
  postId: string,
) {
  const user = await getUserInfo();
  try {
    await toggleFollowAuthor(user?.id as string, authorId);
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }
  }
  revalidatePath(`/posts/${postId}`);
}

export async function createOrEditAuthorProfileAction(formData: FormData) {
  const authorId = formData.get("authorId");
  const bio = formData.get("bio");
  try {
    await createOrEditProfile(authorId as string, bio as string);
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }
  }
  refresh();
}
