"use client";
import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import { toast } from "sonner";
import Loading from "./Loading";
import { useEffect } from "react";

interface Reply {
  id: string;
  content: string;
  authorId: string;
  author: string;
  image: string;
  email: string;
  username: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  replyCount: number;
}

async function getReplies(commentId: string) {
  const res = await fetch(`/api/comments/${commentId}/replies`);
  if (!res.ok) throw new Error("Failed to fetch replies");
  const data = (await res.json()) as Reply[];
  return data;
}

export default function CommentReplies({ commentId }: { commentId: string }) {
  const {
    data: replies,
    error,
    status,
  } = useQuery({
    queryKey: ["replies", commentId],
    queryFn: () => getReplies(commentId),
  });

  useEffect(() => {
    if (status === "error") {
      toast.error(error.message);
    }
  }, [status, error]);

  if (status === "pending") {
    return <Loading />;
  }

  return (
    <ul className="pl-4">
      {replies?.map((reply) => (
        <Comment key={reply.id} comment={reply} />
      ))}
    </ul>
  );
}
