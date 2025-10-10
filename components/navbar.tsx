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
        <span>ByteBlog</span>
      </Link>
      <nav className="hidden gap-4 items-center ml-auto md:flex">
        <Link href="/" className="transition-colors hover:text-primary">
          Home
        </Link>
        <Link href="/topics" className="transition-colors hover:text-primary">
          Topics
        </Link>
      </nav>
      {authenticated ? (
        <div className="hidden gap-4 items-center md:flex">
          <ModeToggle />
          <AvatarDropdown
            name={user?.name as string}
            email={user?.email as string}
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
