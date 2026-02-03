import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-28 w-full h-full">
      <div className="flex flex-col gap-4 mx-auto max-w-3xl">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-6" />
        <hr />
        <Skeleton className="w-full h-6" />
        <hr />
        <Skeleton className="w-full h-50" />
      </div>
    </div>
  );
}
