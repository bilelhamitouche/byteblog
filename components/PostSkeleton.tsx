import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

export default function PostsSkeleton() {
  return (
    <Card className="flex flex-col p-4">
      <div className="flex flex-row gap-2 items-center">
        <Skeleton className="rounded-full size-10" />
        <Skeleton className="h-6 w-30" />
      </div>
      <div className="flex flex-row gap-4">
        <Skeleton className="w-40 h-24 rounded-md" />
        <div className="flex flex-col gap-4 items-start w-full">
          <Skeleton className="w-40 h-8" />
          <Skeleton className="w-full h-10" />
        </div>
      </div>
    </Card>
  );
}
