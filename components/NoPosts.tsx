import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Newspaper } from "lucide-react"
import Link from "next/link"

export function NoPosts() {
  return (
    <Empty className="border border-dashed h-full p-28">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Newspaper />
        </EmptyMedia>
        <EmptyTitle>No Posts</EmptyTitle>
        <EmptyDescription>
          No posts were posted.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <Link href="/write">
            Write Post
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
