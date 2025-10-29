import PostCard from "@/components/PostCard";
import { getPublishedPosts } from "@/lib/queries";
import { NoPosts } from "./NoPosts";

export default async function Posts() {
  const posts = await getPublishedPosts();
  if (!posts || posts.length === 0) return <NoPosts />;
  return (
    <div className="p-4 py-20">
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            image={post.image}
            content={post.content}
            author={post.author as string}
            authorImage={post.authorImage}
            authorUsername={
              post.authorUsername || (post.authorEmail?.split("@")[0] as string)
            }
          />
        ))}
      </ul>
    </div>
  );
}
