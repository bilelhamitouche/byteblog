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
import { Toggle } from "@/components/ui/toggle";
import { writePostSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Underline, Strikethrough, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Write() {
  const form = useForm<z.infer<typeof writePostSchema>>({
    resolver: zodResolver(writePostSchema),
    defaultValues: {
      title: "",
      image: "",
      content: "",
    },
  });
  async function onSubmit(data: z.infer<typeof writePostSchema>) {
    console.log(data);
    console.log(JSON.parse(data.content));
  }
  return (
    <div className="p-8 py-24 space-y-8 w-full h-full">
      <h2 className="text-3xl font-bold">Write new post</h2>
      <Form {...form}>
        <form className="space-y-4 h-full" onSubmit={form.handleSubmit(onSubmit)}>
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
                    <Tiptap content={field.value} onChange={field.onChange} />
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


function Tiptap({ content, onChange }: { content: string; onChange: (content: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(JSON.stringify(json))
    }
  });
  if(!editor) {
    return null;
  }
  return (
    <div className="space-y-2">
      <div className="flex items-center rounded-md border border-input max-w-fit">
        <Toggle
          defaultPressed={editor?.isActive("bold")}
          aria-label="Toggle bold"
          onPressedChange={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold />
        </Toggle>
        <Toggle
          defaultPressed={editor?.isActive("italic")}
          aria-label="Toggle italic"
          onPressedChange={() => editor?.chain().focus().toggleBold().run()}
        >
          <Italic />
        </Toggle>
        <Toggle
          defaultPressed={editor?.isActive("underline")}
          aria-label="Toggle underline"
          onPressedChange={() =>
            editor?.chain().focus().toggleUnderline().run()
          }
        >
          <Underline />
        </Toggle>
        <Toggle
          defaultPressed={editor?.isActive("strike")}
          aria-label="Toggle throughline"
          onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
        >
          <Strikethrough />
        </Toggle>
        <Toggle
          defaultPressed={editor?.isActive("heading", { level: 1 })}
          aria-label="Toggle heading 1"
          onPressedChange={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 />
        </Toggle>
        <Toggle
          defaultPressed={editor?.isActive("heading", { level: 2 })}
          aria-label="Toggle heading 2"
          onPressedChange={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2/>
        </Toggle>
        <Toggle
          defaultPressed={editor?.isActive("heading", { level: 3 })}
          aria-label="Toggle heading 3"
          onPressedChange={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3/>
        </Toggle>
        <Toggle
          defaultPressed={editor?.isActive("heading", { level: 4 })}
          aria-label="Toggle heading 4"
          onPressedChange={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
        >
          <Heading4 />
        </Toggle>
        <Toggle
          defaultPressed={editor?.isActive("heading", { level: 5 })}
          aria-label="Toggle heading 5"
          onPressedChange={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()}
        >
          <Heading5 />
        </Toggle>
        <Toggle
          defaultPressed={editor?.isActive("heading", { level: 6 })}
          aria-label="Toggle heading 6"
          onPressedChange={() => editor?.chain().focus().toggleHeading({ level: 6 }).run()}
        >
          <Heading6 />
        </Toggle>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
