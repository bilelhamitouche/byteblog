import "server-only";
import {
  db,
  follow,
  like,
  post,
  profile,
  tag,
  user,
  userSavesPost,
  postTag,
} from "./drizzle";
import { and, count, DrizzleError, eq, ilike, or } from "drizzle-orm";
import { redirectUnauthenticated } from "@/actions/auth";

export async function getUserByUsername(username: string) {
  await redirectUnauthenticated();
  const newUser = await db
    .selectDistinct()
    .from(user)
    .where(eq(user.username, username));
  return newUser;
}

export async function getUserByUsernameOrEmail(usernameOrEmail: string) {
  const newUser = await db
    .select()
    .from(user)
    .where(
      or(
        eq(user.username, usernameOrEmail),
        ilike(user.email, `${usernameOrEmail}@%`),
      ),
    );
  return newUser[0];
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
    const newPost = await db
      .insert(post)
      .values({ title, image, content, authorId, published })
      .returning();
    return newPost[0];
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function editPost(
  id: string,
  title: string,
  image: string | null,
  content: string,
  published: boolean,
) {
  await redirectUnauthenticated();
  try {
    await db
      .update(post)
      .set({ title, image, content, published })
      .where(eq(post.id, id));
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function deletePost(id: string) {
  await redirectUnauthenticated();
  try {
    await db.delete(post).where(eq(post.id, id));
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
        authorUsername: user.username,
        authorEmail: user.email,
        createdAt: post.createdAt,
      })
      .from(post)
      .leftJoin(user, eq(post.authorId, user.id))
      .where(eq(post.published, true));
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

export async function getPost(id: string) {
  try {
    const currentPost = await db
      .select({
        id: post.id,
        title: post.title,
        image: post.image,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likesCount: count(like.userId),
        authorId: user.id,
        author: user.name,
        authorImage: user.image,
      })
      .from(post)
      .leftJoin(user, eq(user.id, post.authorId))
      .leftJoin(like, eq(post.id, like.postId))
      .where(eq(post.id, id))
      .groupBy(like.postId, post.id, user.id, user.name, user.image);
    return currentPost[0];
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function hasUserLikedPost(postId: string, userId: string) {
  try {
    const likes = await db
      .select()
      .from(like)
      .where(and(eq(like.postId, postId), eq(like.userId, userId)));
    return likes.length > 0;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function hasUserSavedPost(postId: string, userId: string) {
  try {
    const savedPosts = await db
      .select()
      .from(userSavesPost)
      .where(and(eq(like.postId, postId), eq(like.userId, userId)));
    return savedPosts.length > 0;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function toggleLikePost(postId: string, userId: string) {
  await redirectUnauthenticated();
  try {
    const hasUserLiked = await hasUserLikedPost(postId, userId);
    if (hasUserLiked) {
      await db
        .delete(like)
        .where(and(eq(like.userId, userId), eq(like.postId, postId)));
    } else {
      await db.insert(like).values({ userId, postId });
    }
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function toggleSavePost(postId: string, userId: string) {
  await redirectUnauthenticated();
  try {
    const hasUserSaved = await hasUserSavedPost(postId, userId);
    if (hasUserSaved) {
      await db
        .delete(userSavesPost)
        .where(and(eq(like.userId, userId), eq(like.postId, postId)));
    } else {
      await db.insert(userSavesPost).values({ postId, userId });
    }
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function getTopics() {
  try {
    const topics = await db.select().from(topic);
    return topics;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function createTopic(topicName: string) {
  await redirectUnauthenticated();
  try {
    const newTopic = await db.insert(topic).values({ topicName }).returning();
    return newTopic[0];
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function deleteTopic(id: string) {
  await redirectUnauthenticated();
  try {
    await db.delete(topic).where(eq(topic.id, id));
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function searchTags(search: string, limit: number) {
  await redirectUnauthenticated();
  try {
    const tags = await db
      .select()
      .from(tag)
      .where(ilike(tag.tagName, `%${search}%`))
      .limit(limit);
    return tags;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function addTagsToPost(tags: string[], postId: string) {
  await redirectUnauthenticated();
  try {
    tags.forEach(async (tag) => {
      await db
        .insert(postTag)
        .values({ postId, tagId: tag })
        .onConflictDoUpdate({
          target: [postTag.postId, postTag.tagId],
          set: { tagId: tag },
        });
    });
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function createOrEditProfile(userId: string, bio: string) {
  await redirectUnauthenticated();
  try {
    await db
      .insert(profile)
      .values({ userId, bio })
      .onConflictDoUpdate({ target: profile.userId, set: { bio } });
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function hasUserProfile(userId: string) {
  try {
    const hasProfile = await db
      .select()
      .from(profile)
      .where(eq(profile.userId, userId));
    return hasProfile.length > 0;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function getAuthorBio(authorId: string) {
  try {
    const hasProfile = await hasUserProfile(authorId);
    if (hasProfile) {
      const bio = await db
        .select({ bio: profile.bio })
        .from(profile)
        .where(eq(profile.userId, authorId as string));
      return bio[0];
    }
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function hasUserFollowedAuthor(authorId: string, userId: string) {
  try {
    const hasFollowed = await db
      .select()
      .from(follow)
      .where(
        and(eq(follow.followerId, userId), eq(follow.followedId, authorId)),
      );
    return hasFollowed.length > 0;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function toggleFollowAuthor(
  followerId: string,
  followedId: string,
) {
  try {
    const hasUserFollowed = await hasUserFollowedAuthor(followedId, followerId);
    if (hasUserFollowed) {
      await db
        .delete(follow)
        .where(
          and(
            eq(follow.followerId, followerId),
            eq(follow.followedId, followedId),
          ),
        );
    } else {
      await db.insert(follow).values({ followerId, followedId });
    }
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function getFollowedAuthors(authorId: string) {
  try {
    const followedAuthors = await db
      .select({ id: user.id, name: user.name, image: user.image })
      .from(follow)
      .leftJoin(user, eq(user.id, follow.followedId))
      .where(eq(follow.followerId, authorId));
    return followedAuthors;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}
