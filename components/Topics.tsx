import { lusitana } from "@/lib/fonts";
import { Badge } from "./ui/badge";

export default function Topics() {
  return (
    <section className="flex flex-col items-center py-12 px-8 space-y-4 text-center bg-gray-50 sm:py-16 md:py-20 dark:bg-neutral-950">
      <h2 className={`text-3xl font-bold ${lusitana.className}`}>
        Explore Topics
      </h2>
      <p className="max-w-xl text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-400">
        Discover posts across diverse categories that match your interests and
        passions.
      </p>
      <div className="flex flex-wrap gap-4 items-center">
        <Badge variant="default" className="p-2 text-base rounded-full">
          Technology
        </Badge>
        <Badge variant="default" className="p-2 text-base rounded-full">
          Productivity
        </Badge>
        <Badge variant="default" className="p-2 text-base rounded-full">
          Lifestyle
        </Badge>
        <Badge variant="default" className="p-2 text-base rounded-full">
          Travel
        </Badge>
        <Badge variant="default" className="p-2 text-base rounded-full">
          Health
        </Badge>
        <Badge variant="default" className="p-2 text-base rounded-full">
          Design
        </Badge>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        No spam, unsubscribe at any time. We respect your privacy.
      </p>
    </section>
  );
}
