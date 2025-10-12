import { getPost } from "@/lib/queries";
import { notFound } from "next/navigation";

export default async function Post({ params }: { params: Promise<{ postId: string }> }) {
  const postId = (await params).postId;
  const post = await getPost(postId);
  if (!post) notFound();
  return (
    <div className="max-w-3xl h-full py-28 post mx-auto">
      <div className="p-4 flex flex-col items-start gap-2 w-full">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p>{post.createdAt?.toLocaleDateString()}</p>
      </div>
      <hr />
      <p className="p-2 py-8 leading-7">{post.content}</p>
    </div>
  )
}
