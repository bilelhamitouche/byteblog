import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import CommentInfiniteList from "./CommentInfiniteList";
import CommentForm from "./CommentForm";

export default function CommentsSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg">Comments</h3>
      <div className="flex flex-col gap-8">
        <CommentForm />
        <Suspense fallback={<Loader2 className="animate-spin" size="30" />}>
          <CommentInfiniteList />
        </Suspense>
      </div>
    </div>
  );
}
