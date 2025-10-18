import { getFollowedAuthors } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

interface ProfileSidebarProps {
  authorId: string;
  authorName: string;
  authorImage: string | null;
  authorUsername: string;
}

export default async function ProfileSidebar({ authorId, authorName, authorImage, authorUsername }: ProfileSidebarProps) {
  const followers = await getFollowedAuthors(authorId);
  console.log(followers);
  return (
    <aside className="border-r py-28 min-w-xs hidden md:flex flex-col items-center gap-2">
      <Image src={authorImage as string} alt={`${authorName} image`} width="100" height="100" className="rounded-full" />
      <span className="text-lg font-medium">{authorName}</span>
      <Link href={`/authors/${authorUsername}/edit`} className="text-primary text-base">Edit Profile</Link>
    </aside>
  )
}
