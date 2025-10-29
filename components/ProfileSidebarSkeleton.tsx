import { Skeleton } from "./ui/skeleton";

export default async function ProfileSidebar() {
  return (
    <aside className="hidden flex-col gap-4 items-center py-28 border-r md:flex min-w-xs">
      <Skeleton className="rounded-full size-25" />
      <Skeleton className="h-6 w-30" />
      <Skeleton className="w-20 h-6" />
    </aside>
  );
}
