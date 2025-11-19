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
    setTimeout(async () => {
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
    }, 800);
  }, [queryClient]);
  return (
    <div className="overflow-y-auto px-8 mx-auto w-full min-h-full py-26">
      <div className="flex flex-col gap-8 items-center w-full">
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
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={next}
          threshold={1}
        >
          {hasMore && page > 0 && (
            <Loader2 className="my-4 mx-auto w-8 h-8 animate-spin" />
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
