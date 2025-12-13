import { Suspense } from "react";
import PostInfiniteList from "./PostInfiniteList";
import Loading from "./Loading";

export default async function Posts() {
  return (
    <div className="py-24 w-full h-full">
      <Suspense fallback={<Loading />}>
        <PostInfiniteList />
      </Suspense>
    </div>
  );
}
