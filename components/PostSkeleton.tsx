import { Skeleton } from "./ui/skeleton";
import { Card, CardFooter } from "./ui/card";

export default function PostsSkeleton() {
  return (
    <Card className="grid grid-cols-1 gap-4 p-4 min-w-full max-w-xl grid-rows-[200px_1fr_auto] min-h-[28rem]">
      <Skeleton className="w-full h-200px" />
      <div className="flex gap-2 items-center">
        <Skeleton className="rounded-full size-10" />
        <Skeleton className="h-6 w-30" />
      </div>
      <Skeleton className="w-full h-24 rounded-md" />
      <CardFooter className="flex justify-between items-center p-0 w-full">
        <Skeleton className="w-24 h-8" />
        <Skeleton className="size-6" />
      </CardFooter>
    </Card>
  );
}
