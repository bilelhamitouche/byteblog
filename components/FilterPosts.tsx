import { searchPosts } from "@/lib/queries";
import Posts from "./Posts";
import NoSearchResults from "./NoSearchResults";

export default async function FilterPosts({ search }: { search: string }) {
  const posts = await searchPosts(search);
  if (posts && posts.length === 0) return <NoSearchResults />;
  return <Posts />;
}
