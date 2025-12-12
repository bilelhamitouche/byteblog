import { getCommentsByPostId } from "@/lib/queries";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

export default async function CommentsList({ postId }: { postId: string }) {
  const comments = await getCommentsByPostId(postId, 0, 10);
  return (
    <ul className="flex flex-col gap-4">
      <CommentForm postId={postId} />
      {comments?.map((comment) => (
        <Comment
          key={comment.comment.id}
          comment={comment.comment}
          authorName={comment.authorName as string}
          authorEmail={comment.authorEmail ?? ""}
          authorUsername={comment.authorUsername}
          authorImage={comment.authorImage}
        />
      ))}
    </ul>
  );
}
