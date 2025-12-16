import { getAuthorBio } from "@/lib/queries";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { getUserInfo } from "@/actions/auth";
import { lusitana } from "@/lib/fonts";

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
  const user = await getUserInfo();
  const authorProfile = await getAuthorBio(authorId);
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
        <span className={`text-lg font-medium ${lusitana.className}`}>
          {authorName}
        </span>
        <p className={`text-base text-gray-500 dark:text-gray-300`}>
          {authorProfile?.bio}
        </p>
        {user?.id === authorId && (
          <Link
            href={`/authors/${authorUsername}/edit`}
            className="text-base text-primary"
          >
            Edit Profile
          </Link>
        )}
      </div>
    </aside>
  );
}
