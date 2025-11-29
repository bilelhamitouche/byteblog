"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toggleFollowAuthorAction } from "@/actions/authors";

export default function FollowButton({
  postId,
  followedId,
  hasUserFollowed,
  loggedIn,
}: {
  postId: string;
  followedId: string;
  hasUserFollowed: boolean;
  loggedIn: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userFollowed, setUserFollowed] = useState<boolean>(hasUserFollowed);
  const [clickedFollowButton, setClickedFollowButton] =
    useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (!loggedIn && clickedFollowButton) router.push("/login");
  }, [loggedIn, clickedFollowButton, router]);
  async function toggleFollow() {
    setClickedFollowButton(true);
    try {
      setIsLoading(true);
      await toggleFollowAuthorAction(followedId, postId);
      setUserFollowed(!userFollowed);
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
      variant="outline"
      className="rounded-full"
      onClick={toggleFollow}
      disabled={isLoading}
    >
      <span>{userFollowed ? "Unfollow" : "Follow"}</span>
    </Button>
  );
}
