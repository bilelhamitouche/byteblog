"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { createPostAction, editPostAction } from "@/actions/posts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MultipleSelector from "./ui/multiple-selector";

interface PublishPostDialogProps {
  id?: string;
  title: string;
  image: string | null;
  content: string;
}

export default function PublishPostDialog(postData: PublishPostDialogProps) {
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const router = useRouter();
  async function publishPost() {
    const formData = new FormData();
    if (postData.id) {
      formData.append("id", postData.id as string);
    }
    formData.append("title", postData.title);
    formData.append("image", postData.image as string);
    formData.append("content", postData.content);
    formData.append("published", JSON.stringify(true));
    setIsPublishing(true);
    try {
      if (postData.id) {
        const result = await editPostAction(formData);
        if (!result?.message && !result?.errors)
          router.push(`/posts/${postData.id}`);
      } else {
        const result = await createPostAction(formData);
        if (!result?.message && !result?.errors)
          router.push(`/posts/${result?.newPost?.id}`);
      }
    } catch (err) {
      toast.error("Error publishing post");
    } finally {
      setIsPublishing(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Publish</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Publish Post</DialogTitle>
        <DialogDescription>Select post topics</DialogDescription>
        <form className="space-y-4">
          <MultipleSelector
            placeholder="Select topics"
            maxSelected={5}
            hidePlaceholderWhenSelected
            defaultOptions={[
              { value: "javascript", label: "Javascript" },
              { value: "typescript", label: "Typescript" },
              { value: "ruby", label: "Ruby" },
              { value: "python", label: "Python" },
              { value: "c", label: "C" },
              { value: "cpp", label: "C++" },
              { value: "cs", label: "C#" },
            ]}
          />
          <DialogFooter className="flex gap-2 items-center">
            <DialogClose asChild>
              <Button onClick={publishPost} disabled={isPublishing}>
                Publish
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" disabled={isPublishing}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
