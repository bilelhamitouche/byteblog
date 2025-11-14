import { Skeleton } from "./ui/skeleton";

export default async function PostsSkeleton() {
  return (
    <ul>
      {[null, null, null, null].map((_, index) => (
        <li className="flex" key={index}>
          <Skeleton className="size-30" />
          <div className="flex flex-col items-start">
            <Skeleton className="h-10 w-30" />
            <Skeleton className="h-10 w-30" />
          </div>
        </li>
      ))}
    </ul>
  );
}
