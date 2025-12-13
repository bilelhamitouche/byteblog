import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface CommentProps {
  comment: {
    id: string;
    content: string;
    authorId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    author: string | null;
    email: string | null;
    username: string | null;
    image: string | null;
  };
}

export default function Comment({ comment }: CommentProps) {
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
    </div>
  );
}
