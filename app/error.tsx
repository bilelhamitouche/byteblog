"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
      <h2 className="text-red-700 dark:text-red-400">Something went wrong!</h2>
      <Button variant="outline" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
