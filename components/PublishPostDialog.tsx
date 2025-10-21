"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "./ui/dialog";
import { createPostAction } from "@/actions/posts";

interface PublishPostDialogProps {
  id?: string;
  title: string;
  image: string | null;
  content: string;
}

export default function PublishPostDialog(postData: PublishPostDialogProps) {
  async function publishPost() {
    const formData = new FormData();
    if (postData.id) {
      formData.append("id", postData.id as string);
    }
    formData.append("title", postData.title);
    formData.append("image", postData.image as string);
    formData.append("content", postData.content);
    try {
      console.log(formData);
      // const result = await createPostAction(formData);
    } catch (err) {
      toast.error("Error publishing post");
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
        <form>
          <DialogFooter className="flex items-center gap-2">
            <DialogClose asChild>
              <Button onClick={publishPost}>
                Publish
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
