"use server";

export async function createPostAction(formData: FormData) {
  console.log("Post:", formData);
}

export async function createDraftAction(formData: FormData) {
  console.log("Draft:", formData);
}
