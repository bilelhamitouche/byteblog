"use client";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";

export default function SignOutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["session"],
          });
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
