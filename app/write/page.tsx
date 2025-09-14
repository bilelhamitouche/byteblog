"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { writePostSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createDraftAction, createPostAction } from "@/actions/posts";
import { toast } from "sonner";
import LoadingButton from "@/components/ui/loading-button";
import Tiptap from "@/components/Tiptap";
import Link from "next/link";
import { lusitana } from "@/lib/fonts";

export default function Write() {
  const [action, setAction] = useState<"posts" | "drafts">("drafts");
  const [isPostLoading, setIsPostLoading] = useState<boolean>(false);
  const [isDraftLoading, setIsDraftLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof writePostSchema>>({
    resolver: zodResolver(writePostSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      image: "",
      content: "",
    },
  });
  async function onSubmit(data: z.infer<typeof writePostSchema>) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", data.image);
    formData.append("content", data.content);
    if (action === "posts") {
      setIsPostLoading(true);
      try {
        await createPostAction(formData);
      } catch (err) {
        toast.error("Error creating post");
      } finally {
        setIsPostLoading(false);
      }
    } else if (action === "drafts") {
      setIsDraftLoading(true);
      try {
        await createDraftAction(formData);
      } catch (err) {
        toast.error("Error creating draft");
      } finally {
        setIsDraftLoading(false);
      }
    }
  }
  return (
    <div className="p-8 py-24 space-y-8 w-full h-full">
      <h2 className={`text-3xl font-bold ${lusitana.className}`}>
        Write new post
      </h2>
      <Form {...form}>
        <form
          className="space-y-4 h-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Image Url (*optional)
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Content</FormLabel>
                <FormControl>
                  <div className="h-full">
                    <Tiptap content={field.value} onChange={field.onChange} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 items-center">
            {isPostLoading ? (
              <LoadingButton variant="default" size="default" className="" />
            ) : (
              <Button
                variant="default"
                name="action"
                value="posts"
                onClick={() => setAction("posts")}
              >
                Save and publish
              </Button>
            )}
            {isDraftLoading ? (
              <LoadingButton variant="outline" size="default" className="" />
            ) : (
              <Button
                variant="outline"
                name="action"
                value="drafts"
                onClick={() => setAction("drafts")}
              >
                Save to drafts
              </Button>
            )}
            <Button variant="destructive" asChild>
              <Link href="/posts">Discard Changes</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
