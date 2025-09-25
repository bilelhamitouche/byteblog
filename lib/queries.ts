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

export async function getPosts() {
  try {
    const posts = await db
      .select({
        id: post.id,
        image: post.image,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
      })
      .from(post)
      .leftJoin(user, eq(post.authorId, user.id));
    return posts;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function getPostsByAuthorId(authorId: string) {
  await redirectUnauthenticated();
  try {
    const posts = await db
      .select({
        id: post.id,
        image: post.image,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
      })
      .from(post)
      .leftJoin(user, eq(post.authorId, user.id))
      .where(eq(post.authorId, authorId));
    return posts;
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

export async function getDraftsByAuthorId(authorId: string) {
  await redirectUnauthenticated();
  try {
    const drafts = await db
      .select({
        id: draft.id,
        image: draft.image,
        title: draft.title,
        content: draft.content,
        createdAt: draft.createdAt,
      })
      .from(draft)
      .leftJoin(user, eq(draft.authorId, user.id))
      .where(eq(draft.authorId, authorId));
    return drafts;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}
