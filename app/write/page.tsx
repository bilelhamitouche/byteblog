"use client";
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
import { writePostSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Write() {
  const form = useForm<z.infer<typeof writePostSchema>>({
    resolver: zodResolver(writePostSchema),
    defaultValues: {
      title: "",
      image: undefined,
      content: "",
    },
  });
  return (
    <div className="p-8 py-24 space-y-8 w-full h-full">
      <h2 className="text-3xl font-bold">Write new post</h2>
      <Form {...form}>
        <form className="space-y-4 h-full">
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
                    <Input {...field} hidden />
                    <Tiptap />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 items-center">
            <Button variant="default">Save and publish</Button>
            <Button variant="outline">Save to drafts</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
