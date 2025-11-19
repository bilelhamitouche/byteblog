import { POST_LIMIT } from "@/lib/constants";
import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

export default async function PostsSkeleton() {
  return (
    <ul className="flex flex-col gap-8 mx-auto max-w-xl">
      {Array.from({ length: POST_LIMIT }).map((_, index) => (
        <Card className="flex flex-col p-4" key={index}>
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
      ))}
    </ul>
  );
}
