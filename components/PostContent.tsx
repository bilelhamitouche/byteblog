import { JSONContent } from "@tiptap/react";
import { renderPost } from "@/lib/utils";

export default function PostContent({ content }: { content: JSONContent }) {
  return <>{renderPost(content)}</>;
}
