import PostsSkeleton from "@/components/PostsSkeleton";
import FilterPosts from "@/components/FilterPosts";
import { Suspense } from "react";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = (await searchParams).search as string;
  return (
    <div className="w-full h-full">
      <Suspense fallback={<PostsSkeleton />}>
        <FilterPosts search={search} />
      </Suspense>
    </div>
  );
}
