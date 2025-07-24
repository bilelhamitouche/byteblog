import Link from "next/link";
import { Separator } from "./ui/separator";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="p-8">
      <Separator />
      <div className="flex justify-between items-center py-8">
        <p>&copy; {new Date().getFullYear()} ByteBlog. All rights reserved.</p>
        <nav className="flex gap-4 items-center">
          <Link target="_blank" href="/https://instagram.com/ByteBlog">
            <Instagram />
          </Link>
          <Link target="_blank" href="/https://facebook.com/ByteBlog">
            <Facebook />
          </Link>
          <Link target="_blank" href="/https://twitter.com/ByteBlog">
            <Twitter />
          </Link>
        </nav>
      </div>
    </footer>
  );
}
