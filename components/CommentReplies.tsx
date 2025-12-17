"use client";
import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import { toast } from "sonner";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Session } from "better-auth";

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
  likeCount: number;
  likedByCurrentUser: boolean;
}

async function getSession() {
  const session = await authClient.getSession();
  return session;
}

async function getReplies(commentId: string) {
  const res = await fetch(`/api/comments/${commentId}/replies`);
  if (!res.ok) throw new Error("Failed to fetch replies");
  const data = (await res.json()) as Reply[];
  return data;
}

export default function CommentReplies({ commentId }: { commentId: string }) {
  const { data: session, isPending } = useQuery({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });
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

  if (status === "pending" || isPending) {
    return (
      <div className="flex justify-center items-center w-full text-gray-500 dark:text-gray-300">
        <Loader2 className="animate-spin" size="30" />
      </div>
    );
  }

  return (
    <ul className="pl-4">
      {replies?.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          session={session?.data?.session as Session}
        />
      ))}
    </ul>
  );
}
