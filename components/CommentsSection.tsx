import { Suspense } from "react";
import CommentsList from "./CommentsList";
import { Loader2 } from "lucide-react";

export default function CommentsSection({ postId }: { postId: string }) {
  return (
    <Suspense fallback={<Loader2 className="animate-spin" size="30" />}>
      <CommentsList postId={postId} />
    </Suspense>
  );
}
