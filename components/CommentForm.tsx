"use client";
import { commentSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { createCommentAction } from "@/actions/comments";
import { useState } from "react";
import { Button } from "./ui/button";
import LoadingButton from "./ui/loading-button";
import { useRouter } from "next/navigation";

export default function CommentForm({ postId }: { postId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });
  async function onSubmit(data: z.infer<typeof commentSchema>) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("postId", postId);
    try {
      const result = await createCommentAction(formData);
      if (result?.message) {
        toast.error(result.message);
      }
      if (result?.errors) {
        toast.error("Invalid comment");
      }
      form.reset();
      router.refresh();
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
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder="Add a comment" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <LoadingButton variant="default" size="default" className="" />
        ) : (
          <Button type="submit" variant="default">
            Post Comment
          </Button>
        )}
      </form>
    </Form>
  );
}
