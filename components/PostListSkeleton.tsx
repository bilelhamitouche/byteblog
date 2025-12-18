import PostSkeleton from "./PostSkeleton";

export function PostListSkeleton() {
  return (
    <div className="grid gap-8 w-full h-full sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 6 }, (_) => null).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
}
