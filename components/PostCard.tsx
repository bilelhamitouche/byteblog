import Image from "next/image";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

interface PostCardProps {
  title: string;
  image: string | null;
  content: string;
  author: string;
  authorImage: string | null;
}

export default function PostCard({
  title,
  image,
  content,
  author,
  authorImage,
}: PostCardProps) {
  return (
    <Card className="flex flex-col gap-2 items-start p-4 max-w-xl">
      <Link href="" className="flex items-center gap-2 group">
        <Avatar>
          <AvatarImage src={author} alt={`${author} image`} />
          <AvatarFallback>{author[0]}</AvatarFallback>
        </Avatar>
        <CardDescription className="group-hover:underline">{author}</CardDescription>
      </Link>
      <div className="flex items-center gap-4">
        {authorImage ? (
          <Image
            src={image as string}
            alt={`${title} image`}
            width="120"
            height="90"
          />
        ) : null}
        <div className="flex flex-col items-start gap-2">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-300">{content}</p>
        </div>
      </div>
    </Card>
  );
}
