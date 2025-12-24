import {
  getAuthorBio,
  getFollowedAuthors,
  getFollowersCountByAuthorId,
} from "@/lib/queries";
import Image from "next/image";
import { getUserInfo } from "@/actions/auth";
import { lusitana } from "@/lib/fonts";
import EditProfileDialog from "./EditProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

interface ProfileSidebarProps {
  authorId: string;
  authorName: string;
  authorImage: string | null;
}

export default async function ProfileSidebar({
  authorId,
  authorName,
  authorImage,
}: ProfileSidebarProps) {
  const [authorBio, followersCount, user, followedAuthors] = await Promise.all([
    getAuthorBio(authorId),
    getFollowersCountByAuthorId(authorId),
    getUserInfo(),
    getFollowedAuthors(authorId),
  ]);
  return (
    <aside className="hidden flex-col items-start py-28 border-r md:flex min-w-xs">
      <div className="flex flex-col gap-2 justify-center items-center mx-auto">
        <Image
          src={authorImage as string}
          alt={`${authorName} image`}
          width="100"
          height="100"
          className="rounded-full"
        />
        <span className={`text-lg font-medium ${lusitana.className}`}>
          {authorName}
        </span>
        <span className="text-base text-gray-500 dark:text-gray-400">
          {followersCount ? followersCount + " Followers" : null}
        </span>
        <p className={`text-sm text-gray-500 dark:text-gray-400`}>
          {authorBio ?? ""}
        </p>
        {user?.id === authorId && (
          <EditProfileDialog authorId={authorId} bio={authorBio ?? ""} />
        )}
      </div>
      <div className="flex flex-col gap-4">
        {followedAuthors ? <span>Following</span> : null}
        <ul>
          {followedAuthors?.map((followed) => (
            <Link
              href={
                followed.username
                  ? `/authors/@${followed.username}`
                  : `@${followed.email?.split("@")[0]}`
              }
              key={followed.id}
            >
              <Avatar>
                <AvatarImage
                  src={followed.image as string}
                  alt={`${followed.name} image`}
                />
                <AvatarFallback>
                  {followed.name?.toUpperCase()[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{followed.name}</span>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
}
