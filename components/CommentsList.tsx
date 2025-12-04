import { getCommentsByPostId } from "@/lib/queries";
import CommentForm from "./CommentForm";

export default async function CommentsList({ postId }: { postId: string }) {
  const comments = await getCommentsByPostId(postId, 0, 10);
  return (
    <ul className="flex flex-col gap-4">
      <CommentForm postId={postId} />
      {comments?.map((comment) => (
        <div className="p-4" key={comment.id}>
          {comment.content}
        </div>
      ))}
    </ul>
  );
}
