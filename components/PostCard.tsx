"use client";
import { Card, CardDescription, CardFooter, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import SafeImage from "./SafeImage";
import { Button } from "./ui/button";
import PreviewContent from "./PreviewContent";
import LikeButton from "./LikeButton";
import PostSkeleton from "./PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface PostCardProps {
  id: string;
  title: string;
  image: string | null;
  content: string;
  author: string;
  authorUsername: string;
  authorImage: string | null;
}

export default function PostCard({
  id,
  title,
  image,
  content,
  author,
  authorUsername,
  authorImage,
}: PostCardProps) {
  async function getPostLikeInfo() {
    const res = await fetch(`/api/posts/${id}/like-info`);
    if (!res.ok) {
      throw new Error("Failed to fetch post info");
    }
    const data = await res.json();
    return data;
  }
  const {
    data: sessionData,
    isPending: isSessionPending,
    error: sessionError,
  } = authClient.useSession();
  const {
    data: likeInfo,
    isPending,
    error,
  } = useQuery({
    queryKey: ["hasUserLiked", id],
    queryFn: async () => await getPostLikeInfo(),
  });
  if (isPending || isSessionPending) {
    return <PostSkeleton />;
  }
  if (error) {
    toast.error(error?.message);
  } else if (sessionError) {
    toast.error(sessionError?.message);
  }
  return (
    <Card className="grid grid-cols-1 gap-4 p-4 min-w-full max-w-xl grid-rows-[200px_1fr_1fr_auto] min-h-[28rem]">
      <SafeImage
        src={image as string}
        alt="image"
        fallback="/placeholder.svg"
      />
      <div className="flex flex-col gap-2 items-start">
        <Link
          href={`/authors/@${authorUsername}`}
          className="flex gap-2 items-center group"
        >
          <Avatar>
            <AvatarImage src={authorImage as string} alt={`${author} image`} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <CardDescription className="group-hover:underline">
            {author}
          </CardDescription>
        </Link>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <p className="overflow-hidden text-sm text-gray-500 dark:text-gray-300 text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
          <PreviewContent content={JSON.parse(content).content} />
        </p>
      </div>
      <CardFooter className="flex justify-between items-center p-0 w-full">
        <Button variant="outline" asChild>
          <Link href={`/posts/${id}`}>Read Post</Link>
        </Button>
        <LikeButton
          hasUserLiked={likeInfo.hasUserLiked}
          postId={id}
          isDisabled={likeInfo.isDisabled}
          loggedIn={!!sessionData?.session}
        />
      </CardFooter>
    </Card>
  );
}
