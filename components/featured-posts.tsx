import Link from "next/link";
import { Button } from "./ui/button";

export default function FeaturedPosts() {
  return (
    <section className="flex flex-col gap-4 items-center py-12 px-8 text-center sm:py-16 md:py-20">
      <h2 className="text-3xl font-bold">Featured Posts</h2>
      <p className="text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-400">
        Handpicked posts from our community of talented writers
      </p>
      <div className="gap-8 p-8"></div>
      <Button variant="outline" size="lg" asChild>
        <Link href="/posts">View All Posts</Link>
      </Button>
    </section>
  );
}
