"use client";

import { Edit, EllipsisVertical, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { deletePostAction } from "@/actions/posts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PostActionsDropdownProps {
  postId: string;
}
export default function PostActionsDropdown({ postId }: PostActionsDropdownProps) {
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
      toast.error("Error deleting post");
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
          <Link href={`/posts/${postId}/edit`} className="flex items-center gap-3">
            <Edit />
            <span>Edit Post</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={deletePost}>
          <Trash className="text-red-500" />
          <span className="text-red-500">Delete Post</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
