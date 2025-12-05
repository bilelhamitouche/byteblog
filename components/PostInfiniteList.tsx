"use client";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Loader2 } from "lucide-react";
import PostCard from "./PostCard";
import { useQueryClient } from "@tanstack/react-query";
import { POST_LIMIT } from "@/lib/constants";
import { toast } from "sonner";
import { useState } from "react";

interface PostResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

interface Post {
  id: string;
  title: string;
  image: string | null;
  content: string;
  author: string | null;
  authorEmail: string | null;
  authorImage: string | null;
  authorUsername: string | null;
  createdAt: Date | null;
}

export default function PostInfiniteList({
  initialPosts,
  isAuthenticated,
}: {
  initialPosts: Post[];
  isAuthenticated: boolean;
}) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const queryClient = useQueryClient();

  async function getPosts(page: number) {
    const res = await fetch(
      `/api/posts?skip=${POST_LIMIT * page}&limit=${POST_LIMIT}`,
    );
    if (!res.ok) toast.error("Failed to fetch posts");
    const data = (await res.json()) as PostResponse;
    return data;
  }

  async function next() {
    setLoading(true);
    const data = await queryClient.fetchQuery({
      queryKey: ["posts", "infinite-scroll", page],
      queryFn: () => getPosts(page),
    });
    setPosts((prev) => [...prev, ...data.posts]);
    setPage((prev) => prev + 1);

    if (data.posts.length < POST_LIMIT) {
      setHasMore(false);
    }
    setLoading(false);
  }
  return (
    <div className="overflow-y-auto p-8 mx-auto w-full min-h-full">
      <InfiniteScroll
        hasMore={hasMore}
        isLoading={loading}
        next={next}
        threshold={1}
      >
        <div className="grid grid-cols-1 gap-8 place-items-center w-full md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              image={post.image}
              content={post.content}
              author={post.author as string}
              authorEmail={post.authorEmail as string}
              authorImage={post.authorImage}
              authorUsername={post.authorUsername}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
        {hasMore && page > 0 && (
          <div className="flex flex-col gap-2 justify-center items-center my-8 text-gray-500 dark:text-gray-300">
            <Loader2 className="animate-spin size-12" />
            <span className="text-lg">Loading...</span>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
