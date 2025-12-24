import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-full text-gray-500 dark:text-gray-400">
      <Loader2 className="animate-spin" size="50" />
      <span className="text-lg">Loading...</span>
    </div>
  );
}
