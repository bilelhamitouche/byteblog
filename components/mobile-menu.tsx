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
      <SheetContent side="top" className="overflow-auto space-y-4 max-h-screen">
        <SheetHeader>
          <SheetTitle>ByteBlog</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 px-4">
          <Link href="/" className="p-2 transition-colors hover:text-primary">
            Home
          </Link>
          <Link
            href="/topics"
            className="p-2 transition-colors hover:text-primary"
          >
            Topics
          </Link>
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
