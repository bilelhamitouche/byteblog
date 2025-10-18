"use server";

import { toggleFollowAuthor } from "@/lib/queries";
import { getUserInfo } from "./auth";
import { revalidatePath } from "next/cache";

export async function toggleFollowAuthorAction(authorId: string, postId: string) {
  const user = await getUserInfo();
  try {
    await toggleFollowAuthor(authorId, user?.id as string)
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      }
    }
  }
  revalidatePath(`/posts/${postId}`)
}
