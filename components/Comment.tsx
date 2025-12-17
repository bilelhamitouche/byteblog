"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CommentReplies from "./CommentReplies";
import { useState } from "react";
import { Button } from "./ui/button";
import CommentForm from "./CommentForm";
import CommentLikeButton from "./CommentLikeButton";
import { Session } from "better-auth";

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
    likeCount: number;
    likedByCurrentUser: boolean;
  };
  session: Session;
}

export default function Comment({ comment, session }: CommentProps) {
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
      <div className="flex gap-2 items-center pl-4">
        <div className="flex gap-1 items-center">
          <span>{comment.likeCount}</span>
          <CommentLikeButton
            commentId={comment.id}
            hasUserLiked={comment.likedByCurrentUser}
            isDisabled={comment.authorId === session.userId}
            loggedIn={!!session.userId}
          />
        </div>
        {replying ? null : (
          <Button
            variant="link"
            className="self-start"
            onClick={() => setReplying(true)}
          >
            Reply
          </Button>
        )}
        {comment.replyCount > 0 && !repliesShown ? (
          <Button variant="link" onClick={() => setRepliesShown(!repliesShown)}>
            Show Replies ({comment.replyCount})
          </Button>
        ) : (
          <Button variant="link" onClick={() => setRepliesShown(!repliesShown)}>
            Hide Replies
          </Button>
        )}
      </div>
      {replying ? (
        <CommentForm
          parentId={comment.id}
          replying={replying}
          setReplying={setReplying}
          setRepliesShown={setRepliesShown}
        />
      ) : null}
      {repliesShown ? <CommentReplies commentId={comment.id} /> : null}
    </div>
  );
}
