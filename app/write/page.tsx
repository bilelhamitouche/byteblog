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
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Write() {
  const [action, setAction] = useState<"posts" | "drafts">("drafts");
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
    console.log(action);
    console.log(data);
    console.log(JSON.parse(data.content));
  }
  return (
    <div className="p-8 py-24 space-y-8 w-full h-full">
      <h2 className="text-3xl font-bold">Write new post</h2>
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
            <Button
              variant="default"
              name="action"
              value="posts"
              onClick={() => setAction("posts")}
            >
              Save and publish
            </Button>
            <Button
              variant="outline"
              name="action"
              value="drafts"
              onClick={() => setAction("drafts")}
            >
              Save to drafts
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function MenuBar({ editor }: { editor: Editor | null }) {
  return (
    <div className="flex items-center rounded-md border border-input max-w-fit">
      <Button
        type="button"
        variant="ghost"
        aria-label="Toggle bold"
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold />
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label="Toggle italic"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label="Toggle underline"
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <Underline />
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label="Toggle throughline"
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      >
        <Strikethrough />
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label="Toggle heading 1"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 />
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label="Toggle heading 2"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 />
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label="Toggle heading 3"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 />
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label="Toggle heading 4"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 4 }).run()
        }
      >
        <Heading4 />
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label="Toggle heading 5"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 5 }).run()
        }
      >
        <Heading5 />
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label="Toggle heading 6"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 6 }).run()
        }
      >
        <Heading6 />
      </Button>
    </div>
  );
}

function Tiptap({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: content || "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] rounded-md selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input py-1 px-3 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(JSON.stringify(json));
    },
  });
  if (!editor) {
    return null;
  }
  return (
    <div className="space-y-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
