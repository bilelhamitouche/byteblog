import { getPublishedPosts } from "@/lib/queries";
import NoPosts from "./NoPosts";
import { POST_LIMIT } from "@/lib/constants";
import InfiniteScrolling from "./InfiniteScrolling";
import PostsSkeleton from "./PostsSkeleton";
import { Suspense } from "react";

export default async function Posts() {
  const posts = await getPublishedPosts("", 0, POST_LIMIT);
  if (!posts || posts.length === 0) {
    return <NoPosts />;
  }
  return (
    <Suspense fallback={<PostsSkeleton />}>
      <InfiniteScrolling initialPosts={posts} />
    </Suspense>
  );
}
