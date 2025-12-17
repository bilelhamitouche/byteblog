"use client";
import { COMMENT_LIMIT } from "@/lib/constants";
import { toast } from "sonner";
import { useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import Comment from "./Comment";
import { authClient } from "@/lib/auth-client";
import { Session } from "better-auth";

interface CommentResponse {
  comments: Comment[];
  hasMore: boolean;
  currentPage: number;
}

interface Comment {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: string | null;
  email: string | null;
  image: string | null;
  username: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  replyCount: number;
  likeCount: number;
  likedByCurrentUser: boolean;
}

export default function CommentInfiniteList() {
  const { inView, ref } = useInView();
  const { postId } = useParams();

  async function getSession() {
    const session = await authClient.getSession();
    return session;
  }

  async function getComments(page: number) {
    const res = await fetch(
      `/api/posts/${postId}/comments?page=${page}&limit=${COMMENT_LIMIT}`,
    );
    if (!res.ok) throw new Error("Failed to fetch comments");
    const data = (await res.json()) as CommentResponse;
    return data;
  }

  const { data: session, isPending } = useQuery({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });

  const {
    data,
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) => getComments(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    enabled: !!postId,
  });

  const comments = data?.pages.flatMap((page) => page.comments) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (error || !comments) {
      toast.error(error?.message || "Failed to fetch comments");
    }
  }, [error]);

  if (status === "pending" || isPending)
    return (
      <div className="flex flex-col gap-2 justify-center items-center w-full h-full text-gray-500 dark:text-gray-300">
        <Loader2 size="30" className="animate-spin" />
      </div>
    );
  return (
    <div className="flex flex-col gap-2 w-full">
      {comments?.map((comment: Comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          session={session?.data?.session as Session}
        />
      ))}
      <div ref={ref}>
        {isFetchingNextPage ? (
          <div className="flex flex-col gap-2 justify-center items-center">
            <Loader2 size="30" className="animate-spin" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
