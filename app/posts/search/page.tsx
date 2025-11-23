import PostsSkeleton from "@/components/PostsSkeleton";
import FilterPosts from "@/components/FilterPosts";
import { Suspense } from "react";
import { lusitana } from "@/lib/fonts";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = (await searchParams).search as string;
  return (
    <div className="p-8 py-20 w-full h-full md:py-24">
      <h2 className={`text-3xl font-semibold ${lusitana.className}`}>
        Search Results
      </h2>
      <Suspense fallback={<PostsSkeleton />}>
        <FilterPosts search={search} />
      </Suspense>
    </div>
  );
}
