"use client";
import PostCard from "./PostCard";
import { POST_LIMIT } from "@/lib/constants";
import { toast } from "sonner";
import { useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { authClient } from "@/lib/auth-client";
import { Session } from "better-auth";
import NoPosts from "./NoPosts";
import { AuthorPostListSkeleton } from "./AuthorPostListSkeleton";

interface PostResponse {
  posts: Post[];
  hasMore: boolean;
  currentPage: number;
}

interface Post {
  id: string;
  title: string;
  image: string | null;
  content: string;
  authorId: string;
  author: string | null;
  authorEmail: string | null;
  authorImage: string | null;
  authorUsername: string | null;
  createdAt: Date | null;
  likeCount: number;
  likedByCurrentUser: boolean;
}

export default function AuthorPostInfiniteList({
  authorId,
}: {
  authorId: string;
}) {
  const { inView, ref } = useInView();

  async function getSession() {
    const session = await authClient.getSession();
    return session;
  }

  async function getPosts(authorId: string, page: number) {
    const res = await fetch(
      `/api/authors/${authorId}/posts?page=${page}&limit=${POST_LIMIT}`,
    );
    if (!res.ok) toast.error("Failed to fetch posts");
    const data = (await res.json()) as PostResponse;
    return data;
  }

  const { data: session, isPending } = useQuery({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });

  const { data, status, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", authorId],
      queryFn: ({ pageParam }) => getPosts(authorId, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
      },
    });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!isPending && !(status === "pending") && posts.length === 0) {
    return <NoPosts />;
  }

  if (status === "pending" || isPending) return <AuthorPostListSkeleton />;
  return (
    <div className="grid gap-8 place-items-center py-24 px-8 w-full lg:grid-cols-2">
      {posts?.map((post: Post) => (
        <PostCard
          key={post.id}
          post={post}
          session={session?.data?.session as Session}
        />
      ))}
      <div ref={ref} className="w-full h-10"></div>
    </div>
  );
}
