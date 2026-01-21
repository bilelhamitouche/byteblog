import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import SearchPosts from "./SearchPosts";

export default function MobileMenu({
  authenticated,
}: {
  authenticated: boolean;
}) {
  return (
    <Sheet defaultOpen={false}>
      <SheetTrigger asChild>
        <Button variant="outline" className="block md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="overflow-auto space-y-4 max-h-screen"
      >
        <SheetHeader>
          <SheetTitle>ByteBlog</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 px-4 w-full">
          <SearchPosts isAuthenticated={authenticated} isMobile={true} />
          <div className="flex flex-col gap-2">
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/authors">Authors</Link>
            </Button>
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/topics">Topics</Link>
            </Button>
          </div>
        </nav>
        {authenticated ? null : (
          <div className="flex flex-col gap-2 px-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
