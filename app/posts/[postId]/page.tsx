import { getPost } from "@/lib/queries";
import { Heart } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Post({ params }: { params: Promise<{ postId: string }> }) {
  const postId = (await params).postId;
  const post = await getPost(postId);
  if (!post) notFound();
  return (
    <div className="max-w-3xl h-full py-28 post mx-auto">
      <div className="p-4 flex flex-col items-start gap-2 w-full">
        <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="w-full flex gap-4 items-center p-2">
        <div className="flex items-center gap-1">
          <span>{post.likesCount}</span>
          <Heart size="15" />
        </div>
        <p>{post.createdAt?.toLocaleDateString()}</p>
      </div>
      <hr />
      <p className="p-2 py-8 leading-7">{post.content}</p>
    </div>
  )
}
