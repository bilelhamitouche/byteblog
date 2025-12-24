import PostSkeleton from "./PostSkeleton";

export function AuthorPostListSkeleton() {
  return (
    <div className="grid gap-8 w-full h-full lg:grid-cols-2">
      {Array.from({ length: 6 }, (_) => null).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
}
