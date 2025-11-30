import {
  CustomBulletList,
  CustomCodeBlock,
  CustomHeading,
  CustomListItem,
  CustomOrderedList,
} from "@/lib/utils";
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
  List,
  ListOrdered,
  Code,
} from "lucide-react";
import { Button } from "./ui/button";

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
      <Button
        type="button"
        variant="ghost"
        aria-label="Toggle ordered list"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label="Toggle bullet list"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <List />
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label="Toggle code block"
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
      >
        <Code />
      </Button>
    </div>
  );
}

export default function Tiptap({
  content,
  onChange,
}: {
  content: string | object;
  onChange: (content: string) => void;
}) {
  const extensions = [
    StarterKit.configure({
      heading: false,
      bulletList: false,
      orderedList: false,
      listItem: false,
    }),
    CustomHeading,
    CustomBulletList,
    CustomOrderedList,
    CustomListItem,
    CustomCodeBlock,
  ];
  const editor = useEditor({
    extensions: extensions,
    content: content || "<h1>Hello World! 🌎️</h1>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] rounded-md selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input py-1 px-3 text-base sm:text-lg shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
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
