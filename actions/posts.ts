"use server";

import {
  createPost,
  deletePost,
  editPost,
  toggleLikePost,
  toggleSavePost,
} from "@/lib/queries";
import { writePostSchema } from "@/lib/zod";
import { getUserInfo } from "./auth";
import { revalidatePath } from "next/cache";

export async function createPostAction(formData: FormData) {
  const userId = (await getUserInfo())?.id as string;
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");
  const published = formData.get("published");
  const validationResult = writePostSchema.safeParse({ title, image, content });
  if (!validationResult.success)
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  try {
    const newPost = await createPost(
      validationResult.data.title,
      validationResult.data.image,
      validationResult.data.content,
      JSON.parse(published as string) as boolean,
      userId as string,
    );
    return {
      newPost,
    };
  } catch (err: any) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }
  }
}

export async function editPostAction(formData: FormData) {
  const id = formData.get("id");
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");
  const published = formData.get("published");
  const validationResult = writePostSchema.safeParse({ title, image, content });
  if (!validationResult.success)
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  try {
    await editPost(
      id as string,
      validationResult.data.title,
      validationResult.data.image,
      validationResult.data.content,
      JSON.parse(published as string) as boolean,
    );
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }
  }
}

export async function deletePostAction(formData: FormData) {
  const id = formData.get("id");
  try {
    await deletePost(id as string);
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }
  }
}

export async function toggleLikePostAction(postId: string) {
  const user = await getUserInfo();
  try {
    await toggleLikePost(postId, user?.id as string);
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }
  }
  revalidatePath(`/posts/${postId}`);
}

export async function toggleSavePostAction(postId: string) {
  const user = await getUserInfo();
  try {
    await toggleSavePost(postId, user?.id as string);
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }
  }
  revalidatePath(`/posts/${postId}`);
}
