import { Skeleton } from "./ui/skeleton";

export default function PostSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 min-w-full max-w-xl grid-rows-[200px_1fr_1fr_auto] min-h-112">
      <Skeleton className="w-full h-[200px]" />
      <div className="flex flex-col gap-2 items-start">
        <div className="flex gap-2 items-center">
          <Skeleton className="rounded-full size-10" />
          <Skeleton className="h-6 w-30" />
        </div>
        <Skeleton className="w-40 h-6" />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
      <div className="flex justify-between items-center p-0 w-full">
        <Skeleton className="w-20 h-8" />
        <div className="flex gap-1 items-center">
          <Skeleton className="w-8 h-6" />
        </div>
      </div>
    </div>
  );
}
