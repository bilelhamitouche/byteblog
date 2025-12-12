"use client";
import { createPostAction, editPostAction } from "@/actions/posts";
import Tiptap from "@/components/Tiptap";
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
import LoadingButton from "@/components/ui/loading-button";
import { lusitana } from "@/lib/fonts";
import { writePostSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PublishPostDialog from "./PublishPostDialog";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface EditPostFormProps {
  initialPost: {
    id: string;
    title: string;
    image: string | null;
    published: boolean;
    content: string;
  };
}

export default function EditPost({ initialPost }: EditPostFormProps) {
  const [action, setAction] = useState<
    "" | "publish" | "save" | "saveAndPublish"
  >("save");
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof writePostSchema>>({
    resolver: zodResolver(writePostSchema),
    mode: "onSubmit",
    defaultValues: {
      title: initialPost.title,
      image: initialPost.image || "",
      content: initialPost.content,
    },
  });
  const formValues = form.watch();
  async function onSubmit(data: z.infer<typeof writePostSchema>) {
    const formData = new FormData();
    formData.append("id", initialPost.id);
    formData.append("title", data.title);
    formData.append("image", data.image);
    formData.append("content", data.content);
    if (action === "publish") {
      setIsPublishing(true);
      formData.append("published", JSON.stringify(true));
    } else if (action === "saveAndPublish") {
      setIsPublishing(true);
      formData.append("published", JSON.stringify(true));
      const result = await editPostAction(formData);
      if (!result?.message && !result?.errors) router.push("/");
    } else if (action === "save") {
      setIsSaving(true);
      formData.append("published", JSON.stringify(initialPost.published));
      try {
        if (initialPost.id) {
          await editPostAction(formData);
        } else {
          await createPostAction(formData);
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error("Error saving");
        }
      } finally {
        setIsSaving(false);
        queryClient.invalidateQueries({
          queryKey: ["posts"],
          refetchType: "all",
        });
      }
    }
    setIsPublishing(false);
  }
  return (
    <div className="p-8 py-24 space-y-8 w-full h-full">
      <h2 className={`text-3xl font-bold ${lusitana.className}`}>
        {!initialPost.id ? "Write" : "Edit"} post
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
                <FormLabel className="text-base">Image Url</FormLabel>
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
                    <Tiptap
                      content={JSON.parse(field.value)}
                      onChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 items-center">
            {isPublishing ? (
              <LoadingButton variant="default" size="default" className="" />
            ) : initialPost.id ? (
              <Button
                variant="default"
                name="action"
                value="saveAndPublish"
                type="submit"
                onClick={() => setAction("saveAndPublish")}
              >
                Save And Publish
              </Button>
            ) : (
              <PublishPostDialog
                {...(initialPost.id ? { id: initialPost.id } : {})}
                title={formValues.title}
                image={formValues.image}
                content={formValues.content}
              />
            )}
            {isSaving ? (
              <LoadingButton variant="outline" size="default" className="" />
            ) : (
              <Button
                variant="outline"
                name="action"
                value="save"
                type="submit"
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
