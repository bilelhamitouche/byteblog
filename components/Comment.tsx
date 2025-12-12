import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface CommentProps {
  comment: {
    id: string;
    content: string;
    authorId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
  authorName: string;
  authorEmail: string;
  authorUsername: string | null;
  authorImage: string | null;
}

export default function Comment({
  comment,
  authorImage,
  authorEmail,
  authorName,
  authorUsername,
}: CommentProps) {
  return (
    <div className="flex flex-col gap-3 p-4" key={comment.id}>
      <Link
        href={`/authors/@${authorUsername ? authorUsername : authorEmail.split("@")[0]}`}
        className="flex gap-2 items-center text-sm group"
      >
        <Avatar>
          <AvatarImage
            src={authorImage as string}
            alt={`${authorName} image`}
          />
          <AvatarFallback>{authorName?.toUpperCase()[0]}</AvatarFallback>
        </Avatar>
        <span className="group-hover:underline">{authorName}</span>
      </Link>
      <span className="pl-4">{comment.content}</span>
    </div>
  );
}
