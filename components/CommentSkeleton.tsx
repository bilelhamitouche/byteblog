import { Skeleton } from "./ui/skeleton";

export default function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex gap-2 items-center text-sm group">
        <Skeleton className="rounded-full size-10" />
        <Skeleton className="h-6 w-30" />
      </div>
      <Skeleton className="w-full h-20" />
    </div>
  );
}
