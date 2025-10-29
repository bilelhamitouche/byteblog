"use client";
import Image from "next/image";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const isLinkClick = e.target instanceof Element && e.target.closest("a");
    if (isLinkClick) {
      return;
    }
    router.push(`/posts/${id}`);
  }
  return (
    <Card
      className="flex flex-col gap-2 items-start p-4 max-w-xl cursor-pointer"
      onClick={handleClick}
    >
      <Link
        href={`/authors/@${authorUsername}`}
        className="flex gap-2 items-center group"
      >
        <Avatar>
          <AvatarImage src={author} alt={`${author} image`} />
          <AvatarFallback>{author[0]}</AvatarFallback>
        </Avatar>
        <CardDescription className="group-hover:underline">
          {author}
        </CardDescription>
      </Link>
      <div className="flex gap-4 items-center">
        {authorImage ? (
          <Image
            src={image as string}
            alt={`${title} image`}
            width="120"
            height="90"
            className="rounded-md"
          />
        ) : null}
        <div className="flex flex-col gap-2 items-start">
          <Link href={`/posts/${id}`}>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-300">{content}</p>
        </div>
      </div>
    </Card>
  );
}
