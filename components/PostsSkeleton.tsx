import { POST_LIMIT } from "@/lib/constants";
import PostSkeleton from "./PostSkeleton";

export default function PostsSkeleton() {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: POST_LIMIT }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </ul>
  );
}
