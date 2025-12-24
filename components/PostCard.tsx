"use client";
import { Card, CardDescription, CardFooter, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import SafeImage from "./SafeImage";
import { Button } from "./ui/button";
import PreviewContent from "./PreviewContent";
import { Session } from "better-auth";
import PostLikeButton from "./PostLikeButton";

interface PostCardProps {
  id: string;
  title: string;
  image: string | null;
  content: string;
  authorId: string;
  author: string | null;
  authorEmail: string | null;
  authorUsername: string | null;
  authorImage: string | null;
  likeCount: number;
  likedByCurrentUser: boolean;
}

export default function PostCard({
  post,
  session,
}: {
  post: PostCardProps;
  session: Session;
}) {
  return (
    <Card className="grid grid-cols-1 gap-4 p-4 min-w-full max-w-xl grid-rows-[200px_1fr_1fr_auto] min-h-112">
      <SafeImage
        src={post.image as string}
        alt="image"
        fallback="/placeholder.svg"
      />
      <div className="flex flex-col gap-2 items-start">
        <Link
          href={`/authors/@${post.authorUsername ? post.authorUsername : post.authorEmail?.split("@")[0]}`}
          className="flex gap-2 items-center group"
        >
          <Avatar>
            <AvatarImage
              src={post.authorImage as string}
              alt={`${post.author} image`}
            />
            <AvatarFallback>{post.author?.toUpperCase()[0]}</AvatarFallback>
          </Avatar>
          <CardDescription className="group-hover:underline">
            {post.author}
          </CardDescription>
        </Link>
        <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <p className="overflow-hidden text-sm text-gray-500 dark:text-gray-400 text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
          <PreviewContent content={JSON.parse(post.content).content} />
        </p>
      </div>
      <CardFooter className="flex justify-between items-center p-0 w-full">
        <Button variant="outline" asChild>
          <Link href={`/posts/${post.id}`}>Read Post</Link>
        </Button>
        <div className="flex gap-1 items-center">
          <span>{post.likeCount}</span>
          <PostLikeButton
            hasUserLiked={post.likedByCurrentUser}
            postId={post.id}
            isDisabled={post.authorId === session?.userId}
            loggedIn={!!session?.id}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
