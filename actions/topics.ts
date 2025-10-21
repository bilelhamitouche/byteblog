"use server";

export async function createTopicAction(topic: string) {
  try {
    const topic = await createTopic();
  } catch (err) {

  }
}
