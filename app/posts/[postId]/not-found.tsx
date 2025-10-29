import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex justify-center items-center py-28 w-full h-full">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-bold text-red-500 sm:text-3xl">
          Post Not Found
        </h2>
        <Button variant="outline" className="mx-auto" asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}
