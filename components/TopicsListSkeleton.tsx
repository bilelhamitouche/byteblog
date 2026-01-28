import { Skeleton } from "./ui/skeleton";

export function TopicsListSkeleton() {
  return (
    <ul className="flex flex-wrap gap-3 justify-center">
      {Array.from({ length: 50 }, (_) => null).map((_, index) => (
        <Skeleton key={index} className="w-40 h-8 rounded-full" />
      ))}
    </ul>
  );
}
