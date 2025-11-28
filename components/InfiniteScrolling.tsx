"use client";
import React, { useCallback } from "react";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Loader2 } from "lucide-react";
import PostCard from "./PostCard";
import { useQueryClient } from "@tanstack/react-query";
import { POST_LIMIT } from "@/lib/constants";
import { toast } from "sonner";

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
  authorImage: string | null;
  authorUsername: string | null;
  createdAt: Date | null;
}

export default function InfiniteScrolling({
  initialPosts,
}: {
  initialPosts: Post[];
}) {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [posts, setPosts] = React.useState<Post[]>(initialPosts);
  const queryClient = useQueryClient();

  async function getPosts(page: number) {
    new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(
      `/api/posts?skip=${POST_LIMIT * page}&limit=${POST_LIMIT}`,
    );
    if (!res.ok) toast.error("Failed to fetch posts");
    const data = (await res.json()) as PostResponse;
    return data;
  }

  const next = useCallback(async () => {
    setLoading(true);
    const data = await queryClient.fetchQuery({
      queryKey: ["posts", "infinite-scroll"],
      queryFn: () => getPosts(page),
    });
    setPosts((prev) => [...prev, ...data.posts]);
    setPage((prev) => prev + 1);

    if (data.posts.length < POST_LIMIT) {
      setHasMore(false);
    }
    setLoading(false);
  }, [queryClient, page]);
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
              authorImage={post.authorImage}
              authorUsername={post.authorUsername as string}
            />
          ))}
        </div>
        {hasMore && page > 0 && (
          <div className="flex justify-center my-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
