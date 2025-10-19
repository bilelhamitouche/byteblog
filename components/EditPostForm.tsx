"use client";
import { editPostAction } from "@/actions/posts";
import Tiptap from "@/components/Tiptap";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { lusitana } from "@/lib/fonts";
import { writePostSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface EditPostFormProps {
  id: string;
  title: string;
  image: string | null;
  content: string;
}

export default function EditPost({ id, title, image, content }: EditPostFormProps) {
  const [action, setAction] = useState<"" | "publish" | "save">("save");
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const form = useForm<z.infer<typeof writePostSchema>>({
    resolver: zodResolver(writePostSchema),
    mode: "onSubmit",
    defaultValues: {
      title: title,
      image: image || "",
      content: content,
    },
  });
  async function onSubmit(data: z.infer<typeof writePostSchema>) {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", data.title);
    formData.append("image", data.image);
    formData.append("content", data.content);
    if (action === "publish") {
      setIsPublishing(true);
      try {
        formData.append("published", JSON.stringify(true))
        await editPostAction(formData);
      } catch (err) {
        toast.error("Error editing post");
      } finally {
        setIsPublishing(false);
      }
    } else if (action === "save") {
      setIsSaving(true);
      try {
        formData.append("published", JSON.stringify(false))
        await editPostAction(formData);
      } catch (err) {
        toast.error("Error saving");
      } finally {
        setIsSaving(false);
      }
    }
  }
  return (
    <div className="p-8 py-24 space-y-8 w-full h-full">
      <h2 className={`text-3xl font-bold ${lusitana.className}`}>
        Edit post
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
                    <Tiptap content={JSON.parse(field.value)} onChange={field.onChange} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 items-center">
            {isPublishing ? (
              <LoadingButton variant="default" size="default" className="" />
            ) : (
              <Button
                variant="default"
                name="action"
                value="publish"
                onClick={() => setAction("publish")}
              >
                Save and publish
              </Button>
            )}
            {isSaving ? (
              <LoadingButton variant="outline" size="default" className="" />
            ) : (
              <Button
                variant="outline"
                name="action"
                value="save"
                onClick={() => setAction("save")}
              >
                Save
              </Button>
            )}
            <Button variant="destructive">
              <Link href="/">Discard Changes</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
