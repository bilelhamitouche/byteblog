import { searchPosts } from "@/lib/queries";
import NoSearchResults from "./NoSearchResults";
import InfiniteScrolling from "./InfiniteScrolling";

export default async function FilterPosts({ search }: { search: string }) {
  const posts = await searchPosts(search);
  if ((posts && posts.length === 0) || !posts) return <NoSearchResults />;
  return <InfiniteScrolling initialPosts={posts} />;
}
