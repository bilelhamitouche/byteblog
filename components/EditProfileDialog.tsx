"use client";
import { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { createOrEditAuthorProfileAction } from "@/actions/authors";

interface EditProfileDialogProps {
  authorId: string;
  bio: string;
}

export default function EditProfileDialog({
  authorId,
  bio,
}: EditProfileDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(bio);
  async function editProfile() {
    setIsEditing(true);
    try {
      const formData = new FormData();
      formData.append("authorId", authorId);
      formData.append("bio", newBio);
      const result = await createOrEditAuthorProfileAction(formData);
      if (result?.message) {
        toast.error(result.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setIsEditing(false);
    }
  }
  useEffect(() => {
    console.log("newBio updated:", newBio);
  }, [newBio]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Bio</DialogTitle>
        <DialogDescription>Fill in the form to edit your bio</DialogDescription>
        <form className="space-y-4">
          <Textarea
            value={newBio}
            onChange={(e) => {
              setNewBio(e.target.value);
            }}
          />
          <DialogFooter className="flex gap-2 items-center">
            <DialogClose asChild>
              <Button
                disabled={isEditing}
                onClick={() => {
                  editProfile();
                  setNewBio("");
                }}
              >
                Save
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" onClick={() => setNewBio("")}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
