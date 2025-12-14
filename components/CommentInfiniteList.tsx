"use client";
import { COMMENT_LIMIT } from "@/lib/constants";
import { toast } from "sonner";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import Comment from "./Comment";

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
}

export default function CommentInfiniteList() {
  const { inView, ref } = useInView();
  const { postId } = useParams();

  async function getComments(page: number) {
    const res = await fetch(
      `/api/posts/${postId}/comments?page=${page}&limit=${COMMENT_LIMIT}`,
    );
    if (!res.ok) throw new Error("Failed to fetch comments");
    const data = (await res.json()) as CommentResponse;
    return data;
  }

  const { data, status, error, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
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
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage]);

  if (error) {
    toast.error(error.message);
  }

  if (status === "pending")
    return (
      <div className="flex flex-col gap-2 justify-center items-center w-full h-full text-gray-500 dark:text-gray-300">
        <Loader2 size="30" className="animate-spin" />
        <span className="text-base">Loading...</span>
      </div>
    );
  return (
    <div className="flex flex-col gap-8 px-8 w-full">
      {comments?.map((comment: Comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <div ref={ref}>
        {isFetchingNextPage ? (
          <div className="flex flex-col gap-2 justify-center items-center">
            <Loader2 size="30" className="animate-spin" />
            <span className="text-base">Loading...</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
