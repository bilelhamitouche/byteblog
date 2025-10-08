import "server-only";
import { db, post, user } from "./drizzle";
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
  published: boolean,
  authorId: string,
) {
  await redirectUnauthenticated();
  try {
    await db.insert(post).values({ title, image, content, authorId, published });
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function getPublishedPosts() {
  try {
    const posts = await db
      .select({
        id: post.id,
        image: post.image,
        title: post.title,
        content: post.content,
        author: user.name,
        authorImage: user.image,
        createdAt: post.createdAt,
      })
      .from(post)
      .leftJoin(user, eq(post.authorId, user.id)).where(eq(post.published, true));
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
        published: post.published,
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
