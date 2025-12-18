import { Suspense } from "react";
import PostInfiniteList from "./PostInfiniteList";
import { PostListSkeleton } from "./PostListSkeleton";

export default function Posts() {
  return (
    <div className="py-24 w-full h-full">
      <Suspense fallback={<PostListSkeleton />}>
        <PostInfiniteList />
      </Suspense>
    </div>
  );
}
