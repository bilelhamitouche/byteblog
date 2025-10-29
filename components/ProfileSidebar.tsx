import { getFollowedAuthors } from "@/lib/queries";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface ProfileSidebarProps {
  authorId: string;
  authorName: string;
  authorImage: string | null;
  authorUsername: string;
}

export default async function ProfileSidebar({
  authorId,
  authorName,
  authorImage,
  authorUsername,
}: ProfileSidebarProps) {
  const followedAuthors = await getFollowedAuthors(authorId);
  if (!followedAuthors) return null;
  return (
    <aside className="hidden flex-col gap-6 items-start py-28 border-r md:flex min-w-xs">
      <div className="flex flex-col gap-2 justify-center items-center mx-auto">
        <Image
          src={authorImage as string}
          alt={`${authorName} image`}
          width="100"
          height="100"
          className="rounded-full"
        />
        <span className="text-lg font-medium">{authorName}</span>
        <Link
          href={`/authors/${authorUsername}/edit`}
          className="text-base text-primary"
        >
          Edit Profile
        </Link>
      </div>
      <div className="p-4">
        <h3 className="flex gap-2 items-center text-lg font-medium">
          <Users size="17" />
          <span>Following</span>
        </h3>
        <ul className="flex flex-col gap-2 p-2">
          {followedAuthors.map((followed) => (
            <li key={followed.id} className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage
                  src={followed.image as string}
                  alt={`${followed.name} avatar image`}
                />
              </Avatar>
              <span key={followed.id}>{followed.name}</span>
            </li>
          ))}
          <Button variant="link" size="sm" className="flex-start" asChild>
            <Link href={`/authors/@${authorUsername}/following`}>See All</Link>
          </Button>
        </ul>
      </div>
    </aside>
  );
}
