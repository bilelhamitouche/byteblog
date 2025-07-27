import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Settings } from "lucide-react";
import SignOutButton from "./sign-out-button";

interface AvatarDropdownProps {
  name: string;
  email: string;
  image: string | undefined;
}

export default function AvatarDropdown({
  name,
  email,
  image,
}: AvatarDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={image as string} alt={`${name} image`} />
          <AvatarFallback>{name.toUpperCase()[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Avatar>
            <AvatarImage src={image as string} alt={`${name} image`} />
            <AvatarFallback>{name.toUpperCase()[0]}</AvatarFallback>
          </Avatar>
          <span>{email}</span>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/account" className="flex gap-2 items-center">
            <Settings />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
