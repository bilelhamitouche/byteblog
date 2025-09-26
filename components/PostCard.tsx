import Image from "next/image";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface PostCardProps {
  title: string;
  image: string;
  content: string;
  author: string;
  authorImage: string;
}

export default function PostCard({
  title,
  image,
  content,
  author,
  authorImage,
}: PostCardProps) {
  return (
    <Card className="flex flex-col gap-2 items-start">
      <Avatar>
        <AvatarImage src={author} alt={`${author} image`} />
        <AvatarFallback>{author[0]}</AvatarFallback>
      </Avatar>
      <div className="flex items-center">
        <CardDescription>{author}</CardDescription>
        <CardTitle>{title}</CardTitle>
        {authorImage ? (
          <Image
            src={image}
            alt={`${title} image`}
            width="48"
            height="48"
            className="size-48"
          />
        ) : null}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-700">{content[85]}</p>
    </Card>
  );
}
