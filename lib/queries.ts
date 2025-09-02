import "server-only";
import { db, draft, post, user } from "./drizzle";
import { DrizzleError, eq } from "drizzle-orm";
import { isAuthenticated } from "@/actions/auth";
import { redirect } from "next/navigation";

export async function getUserByUsername(username: string) {
  if (!(await isAuthenticated())) redirect("/login");
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
  categoryId: string,
) {
  if (!(await isAuthenticated())) redirect("/login");
  try {
    await db
      .insert(post)
      .values({ title, image, content, categoryId, authorId });
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function createDraft(
  title: string,
  image: string | null,
  content: string,
  authorId: string,
  categoryId: string,
) {
  if (!(await isAuthenticated())) redirect("/login");
  try {
    await db
      .insert(draft)
      .values({ title, image, content, categoryId, authorId });
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}
