import SearchTopics from "@/components/SearchTopics";
import { TopicsList } from "@/components/TopicsList";
import { TopicsListSkeleton } from "@/components/TopicsListSkeleton";
import { lusitana } from "@/lib/fonts";
import { Suspense } from "react";

export default function Topics() {
  return (
    <div className="flex flex-col gap-8 items-center py-24 w-full h-full md:py-28">
      <div className="space-y-1 text-center">
        <h2 className={`text-3xl font-semibold ${lusitana}`}>Browse Topics</h2>
        <p className="text-gray-700 dark:text-gray-400">
          Browse or Search your favorite reading topics
        </p>
      </div>
      <SearchTopics />
      <Suspense fallback={<TopicsListSkeleton />}>
        <TopicsList />
      </Suspense>
    </div>
  );
}
