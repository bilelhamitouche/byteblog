import { Suspense } from "react";
import { lusitana } from "@/lib/fonts";
import SearchPostInfiniteList from "@/components/SearchPostInfiniteList";
import Loading from "@/components/Loading";

export default async function Search() {
  return (
    <div className="p-8 py-20 w-full h-full md:py-24">
      <h2 className={`text-3xl font-semibold ${lusitana.className}`}>
        Search Results
      </h2>
      <Suspense fallback={<Loading />}>
        <SearchPostInfiniteList />
      </Suspense>
    </div>
  );
}
