import { AuthorPostListSkeleton } from "@/components/AuthorPostListSkeleton";
import ProfileSidebarSkeleton from "@/components/ProfileSidebarSkeleton";

export default function AuthorLoading() {
  return (
    <div className="flex w-full h-full">
      <ProfileSidebarSkeleton />
      <AuthorPostListSkeleton />
    </div>
  );
}
