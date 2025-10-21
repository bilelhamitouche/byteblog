"use client";
import { toggleSavePostAction } from "@/actions/posts";
import { Bookmark, BookmarkCheck, SaveIcon } from "lucide-react";
import { toast } from "sonner";
import { Button, ButtonProps } from "./ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SavePostButtonProps extends ButtonProps {
  postId: string;
  hasUserSaved: boolean;
  loggedIn: boolean;
  isDisabled: boolean;
}

export default function SavePostButton({ postId, hasUserSaved, loggedIn, isDisabled }: SavePostButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userSaved, setUserSaved] = useState<boolean>(hasUserSaved);
  const [clickedSaveButton, setClickedSaveButton] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (!loggedIn && clickedSaveButton) router.push('/login');
  }, [loggedIn, clickedSaveButton])
  async function toggleSave() {
    setClickedSaveButton(true);
    try {
      setIsLoading(true);
      await toggleSavePostAction(postId);
      setUserSaved(!userSaved);
    } catch (err) {
      toast.error("Error liking post");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button variant="ghost" size="smallIcon" onClick={toggleSave} disabled={isLoading || isDisabled} >
      {userSaved ? <BookmarkCheck size="15" /> : <Bookmark size="15" />}
    </Button>
  )
}
