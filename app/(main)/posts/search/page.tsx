import { Suspense } from "react";
import { lusitana } from "@/lib/fonts";
import SearchPostInfiniteList from "@/components/SearchPostInfiniteList";
import { PostListSkeleton } from "@/components/PostListSkeleton";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = (await searchParams).search;
  return (
    <div className="py-20 space-y-4 w-full h-full md:py-24">
      <h2 className={`text-3xl px-8 font-semibold ${lusitana.className}`}>
        Results for:
        <span className="ml-4 text-gray-500 dark:text-gray-400">{search}</span>
      </h2>
      <Suspense fallback={<PostListSkeleton />}>
        <SearchPostInfiniteList />
      </Suspense>
    </div>
  );
}
