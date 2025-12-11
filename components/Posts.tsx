import { getPublishedPosts } from "@/lib/queries";
import NoPosts from "./NoPosts";
import { POST_LIMIT } from "@/lib/constants";
import PostsSkeleton from "./PostsSkeleton";
import { Suspense } from "react";
import PostInfiniteList from "./PostInfiniteList";

export default async function Posts() {
  const posts = await getPublishedPosts("", 0, POST_LIMIT);
  if (!posts || posts.length === 0) {
    return <NoPosts />;
  }
  return (
    <div className="py-24 w-full h-full">
      <Suspense fallback={<PostsSkeleton />}>
        <PostInfiniteList />
      </Suspense>
    </div>
  );
}
