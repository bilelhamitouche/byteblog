import { Skeleton } from "./ui/skeleton";

export default async function ProfileSidebar() {
  return (
    <aside className="border-r py-28 min-w-xs hidden md:flex flex-col items-center gap-4">
      <Skeleton className="rounded-full size-25" />
      <Skeleton className="h-6 w-30" />
      <Skeleton className="h-6 w-20" />
    </aside>
  )
}
