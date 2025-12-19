import CommentSkeleton from "./CommentSkeleton";

export default function CommentsListSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {Array.from({ length: 20 }, (_) => null).map((_, index) => (
        <CommentSkeleton key={index} />
      ))}
    </div>
  );
}
