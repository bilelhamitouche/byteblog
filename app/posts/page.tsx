import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/queries"

export default async function Posts() {
  const posts = await getPosts();
  if (!posts || posts.length === 0) return <div className="h-screen w-full flex justify-center items-center text-3xl font-bold">No posts</div>
  return (
    <div className="py-20 p-4">
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} title={post.title} image={post.image} content={post.content} author={post.author as string} authorImage={post.authorImage} />
        ))}
      </ul>
    </div>
  )
}
