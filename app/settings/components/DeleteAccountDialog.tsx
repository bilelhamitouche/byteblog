"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { deleteAccountAction } from "../actions/account";
import { useRouter } from "next/navigation";

type Props = {};

export default function DeleteAccountDialog({}: Props) {
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete account</AlertDialogTitle>
        <AlertDialogDescription>
          Enter your password to delete your account
        </AlertDialogDescription>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={async () => {
                const formData = new FormData();
                formData.append("password", password);
                try {
                  const result = await deleteAccountAction(formData);
                  if (result?.message) {
                    toast.error(result.message);
                  }
                  router.push("/login");
                } catch (err) {
                  if (err instanceof Error) {
                    toast.error("Failed to delete account");
                  }
                }
              }}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
