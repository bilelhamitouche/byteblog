import "server-only";
import { db, draft, post, user } from "./drizzle";
import { DrizzleError, eq } from "drizzle-orm";
import { redirectUnauthenticated } from "@/actions/auth";

export async function getUserByUsername(username: string) {
  await redirectUnauthenticated();
  const newUser = await db
    .selectDistinct()
    .from(user)
    .where(eq(user.username, username));
  return newUser;
}

export async function createPost(
  title: string,
  image: string | null,
  content: string,
  authorId: string,
) {
  await redirectUnauthenticated();
  try {
    await db.insert(post).values({ title, image, content, authorId });
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function createDraft(
  title: string,
  image: string | null,
  content: string,
  authorId: string,
) {
  await redirectUnauthenticated();
  try {
    await db.insert(draft).values({ title, image, content, authorId });
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}
