"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { TopicsListSkeleton } from "./TopicsListSkeleton";

interface Topic {
  id: string;
  topicName: string;
  createdAt: string;
  updatedAt: string;
}

export function TopicsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  async function searchTopics(search: string) {
    const res = await fetch(`/api/topics?search=${encodeURIComponent(search)}`);
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    const data = (await res.json()) as Topic[];
    return data;
  }
  const { data: topics, isPending } = useQuery({
    queryKey: ["topics", search],
    queryFn: () => searchTopics(search),
  });
  if (isPending) {
    return <TopicsListSkeleton />;
  }
  if (topics?.length === 0 || !topics) {
    return <div className="text-gray-500">No topics</div>;
  }
  return (
    <ul className="flex flex-wrap gap-3 justify-center">
      {topics?.map((topic) => (
        <Link href={`/topics/${topic.id}`} key={topic.id}>
          <Badge
            className="p-2 px-3 rounded-full bg-neutral-100 dark:bg-secondary"
            variant="secondary"
          >
            {topic.topicName}
          </Badge>
        </Link>
      ))}
    </ul>
  );
}
