import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Settings, User } from "lucide-react";
import SignOutButton from "./sign-out-button";

interface AvatarDropdownProps {
  name: string;
  email: string;
  username: string;
  image: string | undefined;
}

export default function AvatarDropdown({
  name,
  email,
  username,
  image,
}: AvatarDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          <AvatarImage src={image as string} alt={`${name} image`} />
          <AvatarFallback>{name.toUpperCase()[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10}>
        <DropdownMenuItem>
          <Avatar>
            <AvatarImage src={image as string} alt={`${name} image`} />
            <AvatarFallback>{name.toUpperCase()[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 items-start">
            <span>{name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-200">
              {email}
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={
              username
                ? `/authors/@${username}`
                : `/authors/@${email.split("@")[0]}`
            }
            className="flex gap-2 items-center"
          >
            <User />
            <span>View Profile</span>
          </Link>
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
