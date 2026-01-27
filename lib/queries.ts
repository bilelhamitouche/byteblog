import "server-only";
import {
  db,
  follow,
  postLike,
  post,
  profile,
  topic,
  user,
  userSavesPost,
  postTopic,
  comment,
  commentLike,
} from "./drizzle";
import {
  and,
  count,
  desc,
  DrizzleError,
  eq,
  ilike,
  isNull,
  or,
  sql,
} from "drizzle-orm";
import { redirectUnauthenticated } from "@/actions/auth";
import { alias } from "drizzle-orm/pg-core";

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

export async function getPublishedPosts(
  skip: number,
  limit: number,
  currentUserId: string | null,
  search?: string,
  authorId?: string,
) {
  try {
    const rows = await db
      .select({
        post: {
          ...post,
        },
        author: {
          author: user.name,
          authorImage: user.image,
          authorEmail: user.email,
          authorUsername: user.username,
        },
        likeCount: sql<number>`CAST(count(${postLike.userId}) AS INT)`.as(
          "likeCount",
        ),
        likedByCurrentUser: currentUserId
          ? sql<boolean>`
              EXISTS (
                SELECT 1
                FROM ${postLike}
                WHERE ${postLike.postId} = ${post.id}
                AND ${postLike.userId} = ${currentUserId}
              )
            `.as("likedByCurrentUser")
          : sql<boolean>`false`.as("likedByCurrentUser"),
      })
      .from(post)
      .leftJoin(user, eq(post.authorId, user.id))
      .leftJoin(postLike, eq(postLike.postId, post.id))
      .where(
        authorId
          ? search
            ? and(
                eq(post.published, true),
                ilike(post.title, `%${search}%`),
                eq(post.authorId, authorId ?? ""),
              )
            : and(eq(post.published, true), eq(post.authorId, authorId))
          : search
            ? and(eq(post.published, true), ilike(post.title, `%${search}%`))
            : eq(post.published, true),
      )
      .groupBy(post.id, user.id)
      .orderBy(desc(post.createdAt))
      .offset(skip)
      .limit(limit);
    const posts = rows.map((row) => ({
      ...row.post,
      ...row.author,
      likeCount: row.likeCount,
      likedByCurrentUser: row.likedByCurrentUser,
    }));
    return posts;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
    throw err;
  }
}

export async function getPublishedPostsCount(
  search?: string,
  authorId?: string,
) {
  try {
    const [{ count: postCount }] = await db
      .select({ count: count() })
      .from(post)
      .where(
        authorId
          ? search
            ? and(
                eq(post.published, true),
                eq(post.authorId, authorId ?? ""),
                ilike(post.title, `%${search}%`),
              )
            : and(eq(post.published, true), eq(post.authorId, authorId))
          : search
            ? and(eq(post.published, true), ilike(post.title, `%${search}%`))
            : eq(post.published, true),
      );
    return postCount;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function getPostsByTopicId(topicId: string) {
  try {
    const posts = await db
      .select()
      .from(post)
      .leftJoin(postTopic, eq(post.id, postTopic.postId))
      .where(eq(postTopic.topicId, topicId));
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
        published: post.published,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likesCount: count(postLike.userId),
        authorId: user.id,
        author: user.name,
        authorImage: user.image,
      })
      .from(post)
      .leftJoin(user, eq(user.id, post.authorId))
      .leftJoin(postLike, eq(post.id, postLike.postId))
      .where(eq(post.id, id))
      .groupBy(postLike.postId, post.id, user.id, user.name, user.image);
    return currentPost[0];
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function hasUserLikedPost(postId: string, userId: string) {
  try {
    const likes = await db
      .select()
      .from(postLike)
      .where(and(eq(postLike.postId, postId), eq(postLike.userId, userId)));
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
      .where(and(eq(postLike.postId, postId), eq(postLike.userId, userId)));
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
        .delete(postLike)
        .where(and(eq(postLike.userId, userId), eq(postLike.postId, postId)));
    } else {
      await db.insert(postLike).values({ userId, postId });
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
        .where(and(eq(postLike.userId, userId), eq(postLike.postId, postId)));
    } else {
      await db.insert(userSavesPost).values({ postId, userId });
    }
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function getLikeCount(postId: string) {
  try {
    const [{ likeCount }] = await db
      .select({ likeCount: count(postLike.userId) })
      .from(postLike)
      .where(eq(postLike.postId, postId));
    return likeCount;
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

export async function searchTopics(search: string, limit?: number) {
  try {
    let query = db
      .select()
      .from(topic)
      .where(ilike(topic.topicName, `%${search}%`))
      .$dynamic();
    if (limit) {
      query = query.limit(limit);
    }
    const topics = await query;
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

export async function createTopics(topics: string[]) {
  await redirectUnauthenticated();
  try {
    const createdTopics = topics.map((topic) => {
      return {
        topicName: topic,
      };
    });
    const newTopics = await db.insert(topic).values(createdTopics).returning();
    return newTopics || [];
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function deleteTopics(id: string) {
  await redirectUnauthenticated();
  try {
    await db.delete(topic).where(eq(topic.id, id));
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function addTopicsToPost(topics: string[], postId: string) {
  await redirectUnauthenticated();
  const postTopics: { postId: string; topicId: string }[] = [];
  topics.forEach((topic) => {
    postTopics.push({ postId, topicId: topic });
  });
  try {
    await db.insert(postTopic).values(postTopics);
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function getPostTopics(postId: string) {
  try {
    const topics = await db
      .select({ id: topic.id, name: topic.topicName })
      .from(topic)
      .leftJoin(postTopic, eq(postTopic.topicId, topic.id))
      .where(eq(postTopic.postId, postId));
    return topics;
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
      .onConflictDoUpdate({ target: profile.userId, set: { bio } })
      .returning({ bio: profile.bio });
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
      const [{ bio }] = await db
        .select({ bio: profile.bio })
        .from(profile)
        .where(eq(profile.userId, authorId as string));
      return bio;
    } else {
      return "";
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
      .select({
        id: follow.followedId,
        name: user.name,
        email: user.email,
        username: user.username,
        image: user.image,
      })
      .from(follow)
      .leftJoin(user, eq(follow.followerId, user.id))
      .where(eq(follow.followedId, authorId));
    return followedAuthors;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function getFollowersCountByAuthorId(authorId: string) {
  try {
    const [{ followersCount }] = await db
      .select({ followersCount: count(follow.followerId) })
      .from(follow)
      .where(eq(follow.followedId, authorId));
    return followersCount;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

const reply = alias(comment, "reply");

export async function getCommentsByPostId(
  postId: string,
  skip: number,
  limit: number,
  currentUserId: string | null,
) {
  try {
    const rows = await db
      .select({
        comment: {
          ...comment,
        },
        author: {
          author: user.name,
          authorEmail: user.email,
          authorUsername: user.username,
          authorImage: user.image,
        },
        replyCount: sql<number>`CAST(count(DISTINCT ${reply.id}) AS INT)`,
        likeCount:
          sql<number>`CAST(count(DISTINCT ${commentLike.userId}) AS INT)`.as(
            "likeCount",
          ),
        likedByCurrentUser: currentUserId
          ? sql<boolean>`
              EXISTS (
                SELECT 1
                FROM ${commentLike}
                WHERE ${commentLike.commentId} = ${comment.id}
                AND ${commentLike.userId} = ${currentUserId}
              )
            `.as("likedByCurrentUser")
          : sql<boolean>`false`.as("likedByCurrentUser"),
      })
      .from(comment)
      .leftJoin(reply, eq(reply.parentId, comment.id))
      .leftJoin(commentLike, eq(commentLike.commentId, comment.id))
      .leftJoin(user, eq(comment.authorId, user.id))
      .where(and(eq(comment.postId, postId), isNull(comment.parentId)))
      .groupBy(comment.id, user.id)
      .orderBy(desc(comment.createdAt))
      .limit(limit)
      .offset(skip);
    const comments = rows.map((row) => {
      return {
        ...row.comment,
        ...row.author,
        replyCount: row.replyCount,
        likeCount: row.likeCount,
        likedByCurrentUser: row.likedByCurrentUser,
      };
    });
    return comments;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function getCommentsCount(postId: string) {
  try {
    const [{ count: commentCount }] = await db
      .select({ count: count() })
      .from(comment)
      .where(eq(comment.postId, postId));
    return commentCount;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function getCommentReplies(
  commentId: string,
  currentUserId: string | null,
) {
  try {
    const rows = await db
      .select({
        comment: {
          ...comment,
        },
        author: {
          author: user.name,
          email: user.email,
          username: user.username,
          image: user.image,
        },
        replyCount: sql<number>`CAST(count(DISTINCT ${reply.id}) AS INT)`,
        likeCount:
          sql<number>`CAST(count(DISTINCT ${commentLike.userId}) AS INT)`.as(
            "likeCount",
          ),
        likedByCurrentUser: currentUserId
          ? sql<boolean>`
              EXISTS (
                SELECT 1
                FROM ${commentLike}
                WHERE ${commentLike.commentId} = ${comment.id}
                AND ${commentLike.userId} = ${currentUserId}
              )
            `.as("likedByCurrentUser")
          : sql<boolean>`false`.as("likedByCurrentUser"),
      })
      .from(comment)
      .leftJoin(reply, eq(reply.parentId, comment.id))
      .leftJoin(commentLike, eq(commentLike.commentId, comment.id))
      .leftJoin(user, eq(comment.authorId, user.id))
      .groupBy(comment.id, user.id)
      .where(eq(comment.parentId, commentId));
    const replies = rows.map((row) => {
      return {
        ...row.comment,
        ...row.author,
        replyCount: row.replyCount,
        likeCount: row.likeCount,
        likedByCurrentUser: row.likedByCurrentUser,
      };
    });
    return replies;
  } catch (err) {
    if (err instanceof Error) throw new Error("Database Error");
  }
}

export async function hasUserLikedComment(commentId: string, userId: string) {
  try {
    const likes = await db
      .select()
      .from(commentLike)
      .where(
        and(
          eq(commentLike.commentId, commentId),
          eq(commentLike.userId, userId),
        ),
      );
    return likes.length > 0;
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function toggleLikeComment(commentId: string, userId: string) {
  await redirectUnauthenticated();
  try {
    const hasUserLiked = await hasUserLikedComment(commentId, userId);
    if (hasUserLiked) {
      await db
        .delete(commentLike)
        .where(
          and(
            eq(commentLike.userId, userId),
            eq(commentLike.commentId, commentId),
          ),
        );
    } else {
      await db.insert(commentLike).values({ userId, commentId });
    }
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function createComment(
  content: string,
  authorId: string,
  postId: string,
  parentId: string | null,
) {
  await redirectUnauthenticated();
  try {
    await db.insert(comment).values({ content, postId, authorId, parentId });
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}

export async function deleteComment(id: string) {
  await redirectUnauthenticated();
  try {
    await db.delete(comment).where(eq(comment.id, id));
  } catch (err) {
    if (err instanceof DrizzleError) throw new Error("Database Error");
  }
}
