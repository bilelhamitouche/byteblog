"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CommentReplies from "./CommentReplies";
import { useState } from "react";
import { Button } from "./ui/button";
import CommentForm from "./CommentForm";

interface CommentProps {
  comment: {
    id: string;
    content: string;
    authorId: string;
    author: string | null;
    email: string | null;
    username: string | null;
    image: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    replyCount: number;
  };
}

export default function Comment({ comment }: CommentProps) {
  const [repliesShown, setRepliesShown] = useState(false);
  const [replying, setReplying] = useState(false);
  return (
    <div className="flex flex-col gap-3 p-4" key={comment.id}>
      <Link
        href={`/authors/@${comment.username ? comment.username : comment.email?.split("@")[0]}`}
        className="flex gap-2 items-center text-sm group"
      >
        <Avatar>
          <AvatarImage
            src={comment.image as string}
            alt={`${comment.author} image`}
          />
          <AvatarFallback>{comment.author?.toUpperCase()[0]}</AvatarFallback>
        </Avatar>
        <span className="group-hover:underline">{comment.author}</span>
      </Link>
      <span className="pl-4">{comment.content}</span>
      {replying ? (
        <CommentForm
          parentId={comment.id}
          replying={replying}
          setReplying={setReplying}
        />
      ) : (
        <Button className="self-start" onClick={() => setReplying(true)}>
          Reply
        </Button>
      )}
      {comment.replyCount > 0 && !repliesShown ? (
        <Button variant="ghost" onClick={() => setRepliesShown(!repliesShown)}>
          Show Replies
        </Button>
      ) : null}
      {repliesShown ? (
        <>
          <CommentReplies commentId={comment.id} />
          <Button
            variant="ghost"
            onClick={() => setRepliesShown(!repliesShown)}
          >
            Hide Replies
          </Button>
        </>
      ) : null}
    </div>
  );
}
