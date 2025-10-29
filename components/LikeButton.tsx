"use client";
import { toggleLikePostAction } from "@/actions/posts";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button, ButtonProps } from "./ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LikeButtonProps extends ButtonProps {
  postId: string;
  hasUserLiked: boolean;
  loggedIn: boolean;
  isDisabled: boolean;
}

export default function LikeButton({
  postId,
  hasUserLiked,
  loggedIn,
  isDisabled,
}: LikeButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(hasUserLiked);
  const [clickedLikeButton, setClickedLikeButton] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (!loggedIn && clickedLikeButton) router.push("/login");
  }, [loggedIn, clickedLikeButton]);
  async function toggleLike() {
    setClickedLikeButton(true);
    try {
      setIsLoading(true);
      await toggleLikePostAction(postId);
      setUserLiked(!userLiked);
    } catch (err) {
      toast.error("Error liking post");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button
      variant="ghost"
      size="smallIcon"
      onClick={toggleLike}
      disabled={isLoading || isDisabled}
    >
      <Heart
        size="15"
        className={`${userLiked ? "text-primary" : "text-foreground"} transition-colors duration-300`}
      />
    </Button>
  );
}
