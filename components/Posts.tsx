import { getPublishedPosts } from "@/lib/queries";
import NoPosts from "./NoPosts";
import { POST_LIMIT } from "@/lib/constants";
import { Suspense } from "react";
import PostInfiniteList from "./PostInfiniteList";
import Loading from "./Loading";

export default async function Posts() {
  const posts = await getPublishedPosts("", 0, POST_LIMIT);
  if (!posts || posts.length === 0) {
    return <NoPosts />;
  }
  return (
    <div className="py-24 w-full h-full">
      <Suspense fallback={<Loading />}>
        <PostInfiniteList />
      </Suspense>
    </div>
  );
}
