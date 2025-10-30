"use server";

import { createTopic, deleteTopic } from "@/lib/queries";

export async function createTopicAction(formData: FormData) {
  const topic = formData.get("topic") as string;
  try {
    const newTopic = await createTopic(topic);
    return newTopic;
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }
  }
}

export async function deleteTopicAction(formData: FormData) {
  const id = formData.get("id") as string;
  try {
    await deleteTopic(id);
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }
  }
}
