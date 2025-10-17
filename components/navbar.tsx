import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import MobileMenu from "./mobile-menu";
import { ModeToggle } from "./mode-toggle";
import { getUserInfo, isAuthenticated } from "@/actions/auth";
import AvatarDropdown from "./avatar-dropdown";

export default async function Navbar() {
  const authenticated = await isAuthenticated();
  const user = await getUserInfo();
  return (
    <header className="flex fixed z-10 gap-8 justify-between items-center p-4 px-8 mx-auto w-full border-b-1 backdrop-blur-lg bg-background/60">
      <Link href="/" className="flex gap-2 items-center">
        <BookOpen size="25" />
        <span className={`text-xl font-bold ${lusitana.className}`}>ByteBlog</span>
      </Link>
      <nav className="items-center gap-4 hidden md:flex">
        <Link href="/topics" className="hover:text-green-600">Topics</Link>
        <Link href="/authors" className="hover:text-green-600">Authors</Link>
      </nav>
      {authenticated ? (
        <div className="hidden gap-4 items-center md:flex">
          <ModeToggle />
          <AvatarDropdown
            name={user?.name as string}
            email={user?.email as string}
            username={user?.username as string}
            image={user?.image as string}
          />
        </div>
      ) : (
        <div className="hidden gap-2 items-center md:flex">
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
          <ModeToggle />
        </div>
      )}
      <MobileMenu authenticated={authenticated} />
    </header>
  );
}
