import AuthorPostInfiniteList from "@/components/AuthorPostInfiniteList";
import { AuthorPostListSkeleton } from "@/components/AuthorPostListSkeleton";
import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileSidebarSkeleton from "@/components/ProfileSidebarSkeleton";
import { getUserByUsernameOrEmail } from "@/lib/queries";
import { Suspense } from "react";

export default async function Author({
  params,
}: {
  params: Promise<{ authorId: string }>;
}) {
  const { authorId } = await params;
  const authorUsername = decodeURIComponent(authorId);
  const user = await getUserByUsernameOrEmail(authorUsername.split("@")[1]);
  return (
    <div className="flex w-full h-full">
      <Suspense fallback={<ProfileSidebarSkeleton />}>
        <ProfileSidebar
          authorId={user.id}
          authorName={user.name}
          authorImage={user.image}
        />
      </Suspense>
      <Suspense fallback={<AuthorPostListSkeleton />}>
        <AuthorPostInfiniteList authorId={user.id} />
      </Suspense>
    </div>
  );
}
