import { Skeleton } from "./ui/skeleton";

export default function EditPostFormSekeleton() {
  return (
    <div className="flex flex-col gap-8 p-8 py-24 w-full h-full">
      <Skeleton className="h-8 w-30" />
      <div className="space-y-6 h-full">
        <div className="space-y-4">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-full h-8" />
        </div>
        <div className="space-y-4">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-full h-8" />
        </div>
        <div className="space-y-4">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-1/2 h-8" />
          <Skeleton className="w-full h-[150px]" />
        </div>
        <div className="flex gap-4 items-center w-full">
          <Skeleton className="h-8 w-30" />
          <Skeleton className="h-8 w-30" />
          <Skeleton className="w-36 h-8" />
        </div>
      </div>
    </div>
  );
}
