import { lusitana } from "@/lib/fonts";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Newsletter() {
  return (
    <section className="flex flex-col items-center py-12 px-8 space-y-4 text-center bg-gray-800 sm:py-16 md:py-20 dark:bg-gray-100">
      <h2
        className={`text-3xl font-bold text-white dark:text-black ${lusitana.className}`}
      >
        Never Miss a Great Post
      </h2>
      <p className="max-w-xl text-base text-gray-400 md:text-lg lg:text-xl dark:text-gray-600">
        Join thousands of readers who get the best posts delivered to their
        inbox every week. Curated content, fresh perspectives, and meaningful
        insights.
      </p>
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Enter your email address"
          type="email"
          className="text-gray-100 bg-gray-800 dark:text-gray-800 dark:bg-gray-100 placeholder:text-gray-500"
        />
        <Button variant="default">Subscribe Now</Button>
      </div>
    </section>
  );
}
