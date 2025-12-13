"use client";
import PostCard from "./PostCard";
import { POST_LIMIT } from "@/lib/constants";
import { toast } from "sonner";
import { useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Session } from "better-auth";
import NoPosts from "./NoPosts";

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
  const { inView, ref } = useInView();

  async function getSession() {
    const session = await authClient.getSession();
    return session;
  }

  async function getPosts(page: number) {
    const res = await fetch(`/api/posts?page=${page}&limit=${POST_LIMIT}`);
    if (!res.ok) toast.error("Failed to fetch posts");
    const data = (await res.json()) as PostResponse;
    return data;
  }

  const { data: session, isPending } = useQuery({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });

  const { data, status, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts(pageParam),
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

  if (!isPending && !(status === "pending") && posts.length === 0) {
    return <NoPosts />;
  }

  if (status === "pending" || isPending)
    return (
      <div className="flex flex-col gap-2 justify-center items-center w-full h-full text-gray-500 dark:text-gray-300">
        <Loader2 size="50" className="animate-spin" />
        <span className="text-lg">Loading...</span>
      </div>
    );
  return (
    <div className="grid grid-cols-1 gap-8 place-items-center px-8 w-full md:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post: Post) => (
        <PostCard
          key={post.id}
          post={post}
          session={session?.data?.session as Session}
        />
      ))}
      <div ref={ref} className="bg-red-500 sm:col-span-2 md:col-span-3">
        {isFetchingNextPage ? (
          <div className="flex flex-col gap-2 justify-center items-center">
            <Loader2 size="50" className="animate-spin" />
            <span className="text-lg">Loading...</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
