import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Newspaper } from "lucide-react";
import Link from "next/link";

export default function NoSearchResults() {
  return (
    <Empty className="p-28 h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Newspaper />
        </EmptyMedia>
        <EmptyTitle>No Results</EmptyTitle>
        <EmptyDescription>No search results found.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <Link href="/posts">Browse posts</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
