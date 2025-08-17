"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Underline } from "lucide-react";
import { Toggle } from "./ui/toggle";

export default function Tiptap() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
  });
  return (
    <div className="space-y-2">
      <div className="flex items-center rounded-md border border-input">
        <Toggle
          pressed={editor?.isActive("bold")}
          aria-label="Toggle bold"
          onPressedChange={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold />
        </Toggle>
        <Toggle
          pressed={editor?.isActive("italic")}
          aria-label="Toggle italic"
          onPressedChange={() => editor?.chain().focus().toggleBold().run()}
        >
          <Italic />
        </Toggle>
        <Toggle
          pressed={editor?.isActive("underline")}
          aria-label="Toggle underline"
          onPressedChange={() =>
            editor?.chain().focus().toggleUnderline().run()
          }
        >
          <Underline />
        </Toggle>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
