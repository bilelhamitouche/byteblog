import EditPostForm from "@/components/EditPostForm";
import { getPost } from "@/lib/queries";
import { notFound } from "next/navigation";

export default async function EditPost({ params }: { params: Promise<{ postId: string }> }) {
  const postId = (await params).postId;
  const post = await getPost(postId);
  if (!post) notFound();
  return <EditPostForm id={post.id} title={post.title} image={post.image} content={post.content} />
}
