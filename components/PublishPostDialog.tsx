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
import { useCallback, useRef, useState } from "react";
import MultipleSelector, { Option } from "./ui/multiple-selector";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface PublishPostDialogProps {
  id?: string;
  title: string;
  image: string | null;
  content: string;
}

interface Tag {
  id: string;
  tagName: string;
  topicId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function PublishPostDialog(postData: PublishPostDialogProps) {
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const selectedRef = useRef<Option[]>([]);
  const queryClient = useQueryClient();
  const router = useRouter();
  async function getTags(value: string) {
    const res = await fetch(`/api/tags?search=${value}&limit=5`);
    if (!res.ok) toast.error("Failed to fetch tags");
    return res.json();
  }
  function onChange(options: Option[]) {
    selectedRef.current = options;
  }
  const onSearch = useCallback(
    async function (value: string) {
      const data = await queryClient.fetchQuery({
        queryKey: ["autocomplete", value],
        queryFn: () => getTags(value),
        staleTime: 5 * 60 * 1000,
      });
      if (data) {
        const newData: Option[] = [];
        data.forEach((item: Tag) => {
          newData.push({ value: item.id, label: item.tagName });
        });
        return newData;
      }
      return [];
    },
    [queryClient],
  );
  async function publishPost() {
    const formData = new FormData();
    if (postData.id) {
      formData.append("id", postData.id as string);
    }
    formData.append("title", postData.title);
    formData.append("image", postData.image as string);
    formData.append("content", postData.content);
    formData.append("published", JSON.stringify(true));
    formData.append("tags", JSON.stringify(selectedRef.current));
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
      if (err instanceof Error) {
        toast.error("Error publishing post");
      }
    } finally {
      setIsPublishing(false);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        refetchType: "all",
      });
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
            delay={500}
            creatable
            loadingIndicator={
              <div className="p-4">
                <Loader2 size="25" className="mx-auto animate-spin" />
              </div>
            }
            emptyIndicator={
              <div className="p-4">
                <span className="text-gray-500 dark:text-gray-300">
                  No results
                </span>
              </div>
            }
            onSearch={onSearch}
            onChange={onChange}
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
