"use client";

import { EllipsisVertical } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { deletePostAction } from "@/actions/posts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";

interface PostActionsDropdownProps {
  postId: string;
}
export default function PostActionsDropdown({
  postId,
}: PostActionsDropdownProps) {
  const router = useRouter();
  async function deletePost() {
    const formData = new FormData();
    formData.append("id", postId);
    try {
      const result = await deletePostAction(formData);
      if (result?.message) {
        toast.error(result.message);
      }
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Error deleting post");
      }
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="smallIcon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link
            href={`/posts/${postId}/edit`}
            className="flex gap-3 items-center"
          >
            <PencilSquareIcon />
            <span>Edit Post</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={deletePost}>
          <TrashIcon className="text-red-500 dark:text-red-600" />
          <span className="text-red-500 dark:text-red-600">Delete Post</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
