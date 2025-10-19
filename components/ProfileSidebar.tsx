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
  const followedAuthors = await getFollowedAuthors(authorId);
  if (!followedAuthors) return null;
  return (
    <aside className="border-r py-28 min-w-xs hidden md:flex flex-col items-center gap-2">
      <Image src={authorImage as string} alt={`${authorName} image`} width="100" height="100" className="rounded-full" />
      <span className="text-lg font-medium">{authorName}</span>
      <Link href={`/authors/${authorUsername}/edit`} className="text-primary text-base">Edit Profile</Link>
      <div className="p-4">
        <h3 className="text-lg flex items-center gap-2 font-medium">
          <Users size="17" />
          <span>Following</span>
        </h3>
        <ul className="flex flex-col gap-2 p-2">{followedAuthors.map((followed) => (
          <li className="gap-2 flex items-center">
            <Avatar>
              <AvatarImage src={followed.image as string} alt={`${followed.name} avatar image`} />
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
  )
}
