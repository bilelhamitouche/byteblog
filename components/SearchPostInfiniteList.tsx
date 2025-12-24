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
import { useSearchParams } from "next/navigation";
import { PostListSkeleton } from "./PostListSkeleton";

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

export default function PostInfiniteList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const { inView, ref } = useInView();

  async function getSession() {
    const session = await authClient.getSession();
    return session;
  }

  async function getPosts(search: string, page: number) {
    const res = await fetch(
      `/api/posts?search=${search}&page=${page}&limit=${POST_LIMIT}`,
    );
    if (!res.ok) throw new Error("Failed to fetch posts");
    const data = (await res.json()) as PostResponse;
    return data;
  }

  const { data: session, isPending } = useQuery({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });

  const { data, status, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["search", "posts", search],
    queryFn: ({ pageParam }) => getPosts(search, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
  });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [search]);

  if (status === "error") {
    toast.error(error.message);
  }

  if (!isPending && !(status === "pending") && posts.length === 0) {
    return <NoPosts />;
  }

  if (status === "pending" || isPending) return <PostListSkeleton />;
  return (
    <div className="grid grid-cols-1 gap-8 place-items-center px-8 w-full md:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post: Post) => (
        <PostCard
          key={post.id}
          post={post}
          session={session?.data?.session as Session}
        />
      ))}
      <div ref={ref}></div>
    </div>
  );
}
