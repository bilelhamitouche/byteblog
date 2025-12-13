"use client";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function SignOutButton() {
  const router = useRouter();
  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  return (
    <DropdownMenuItem onClick={signOut}>
      <LogOut />
      <span>Logout</span>
    </DropdownMenuItem>
  );
}
