import { Suspense } from "react";
import { lusitana } from "@/lib/fonts";
import SearchPostInfiniteList from "@/components/SearchPostInfiniteList";
import { PostListSkeleton } from "@/components/PostListSkeleton";

export default async function Search() {
  return (
    <div className="py-20 space-y-4 w-full h-full md:py-24">
      <h2 className={`text-3xl px-8 font-semibold ${lusitana.className}`}>
        Search Results
      </h2>
      <Suspense fallback={<PostListSkeleton />}>
        <SearchPostInfiniteList />
      </Suspense>
    </div>
  );
}
