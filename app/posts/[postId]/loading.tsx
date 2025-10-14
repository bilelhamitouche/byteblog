import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-full w-full py-28">
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-full" />
        <hr />
        <Skeleton className="h-6 w-full" />
        <hr />
        <Skeleton className="h-50 w-full" />
      </div>
    </div>
  )
}
