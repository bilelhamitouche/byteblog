"use client";
import { toggleSavePostAction } from "@/actions/posts";
import { toast } from "sonner";
import { Button, ButtonProps } from "./ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookmarkIcon } from "@heroicons/react/16/solid";
import { Bookmark } from "lucide-react";

interface SavePostButtonProps extends ButtonProps {
  postId: string;
  hasUserSaved: boolean;
  loggedIn: boolean;
  isDisabled: boolean;
}

export default function SavePostButton({
  postId,
  hasUserSaved,
  loggedIn,
  isDisabled,
}: SavePostButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userSaved, setUserSaved] = useState<boolean>(hasUserSaved);
  const [clickedSaveButton, setClickedSaveButton] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (!loggedIn && clickedSaveButton) router.push("/login");
  }, [loggedIn, clickedSaveButton, router]);
  async function toggleSave() {
    setClickedSaveButton(true);
    try {
      setIsLoading(true);
      await toggleSavePostAction(postId);
      setUserSaved(!userSaved);
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Error liking post");
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={toggleSave}
      disabled={isLoading || isDisabled}
    >
      {userSaved ? <BookmarkIcon /> : <Bookmark size="16" />}
    </Button>
  );
}
