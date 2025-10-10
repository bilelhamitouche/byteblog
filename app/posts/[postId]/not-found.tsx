import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="w-full h-full py-28 items-center justify-center flex">
      <div className="gap-4 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-red-500">Post Not Found</h2>
        <Button variant="outline" className="mx-auto" asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  )
}
