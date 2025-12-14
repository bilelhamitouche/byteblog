"use client";
import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import { toast } from "sonner";
import Loading from "./Loading";

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
  const response = await fetch(`/api/comments/${commentId}/replies`);
  const data = (await response.json()) as Reply[];
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

  if (status === "error") {
    toast.error(error.message);
  }

  if (status === "pending") {
    return <Loading />;
  }

  return (
    <ul>
      {replies?.map((reply) => (
        <Comment key={reply.id} comment={reply} />
      ))}
    </ul>
  );
}
