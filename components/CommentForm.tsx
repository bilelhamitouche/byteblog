"use client";
import { commentSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { createCommentAction } from "@/actions/comments";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import LoadingButton from "./ui/loading-button";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface CommentFormProps {
  parentId?: string;
  replying?: boolean;
  setReplying?: Dispatch<SetStateAction<boolean>>;
  setRepliesShown?: Dispatch<SetStateAction<boolean>>;
}

export default function CommentForm({
  parentId,
  replying,
  setReplying,
  setRepliesShown,
}: CommentFormProps) {
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });
  const queryClient = useQueryClient();
  async function onSubmit(data: z.infer<typeof commentSchema>) {
    setIsLoading(true);
    const formData = new FormData();
    if (parentId) {
      formData.append("parentId", parentId);
    }
    formData.append("content", data.content);
    formData.append("postId", postId as string);
    try {
      const result = await createCommentAction(formData);
      if (result?.message) {
        toast.error(result.message);
      }
      if (result?.errors) {
        toast.error("Invalid comment");
      }
      form.reset();
      setReplying && setReplying(false);
      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
      if (parentId) {
        queryClient.invalidateQueries({
          queryKey: ["replies", parentId],
        });
      }
      setRepliesShown && setRepliesShown(true);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form className="space-y-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Add a comment"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center">
          {isLoading ? (
            <LoadingButton variant="default" size="default" />
          ) : (
            <Button type="submit" variant="default">
              Post Comment
            </Button>
          )}
          {parentId ? (
            <Button
              type="reset"
              variant="destructive"
              onClick={() => setReplying && setReplying(!replying)}
            >
              Cancel
            </Button>
          ) : null}
        </div>
      </form>
    </Form>
  );
}
