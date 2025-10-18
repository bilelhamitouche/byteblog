import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileSidebarSkeleton from "@/components/ProfileSidebarSkeleton";
import { getAuthorBio, getUserByUsernameOrEmail } from "@/lib/queries";
import { Suspense } from "react";

export default async function Author({ params }: { params: Promise<{ authorId: string }> }) {
  const authorUsername = decodeURIComponent((await params).authorId);
  const user = await getUserByUsernameOrEmail(authorUsername.split("@")[1]);
  const authorProfile = await getAuthorBio(user.id);
  return (
    <div className="w-full h-full flex">
      <Suspense fallback={<ProfileSidebarSkeleton />}>
        <ProfileSidebar authorId={user.id} authorName={user.name} authorImage={user.image} authorUsername={authorUsername} />
      </Suspense>
      <div className="flex items-start space-y-4 py-20 px-8">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-500 dark:text-gray-300">{authorProfile?.bio}</p>
      </div>
    </div>
  )
}
