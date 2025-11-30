import { JSONContent } from "@tiptap/react";

export default function PreviewContent({ content }: { content: JSONContent }) {
  const firstNode = findFirstRenderableNode(content);
  if (!firstNode) return null;

  const text = extractText(firstNode);
  return <span>{text}</span>;
}

function findFirstRenderableNode(node: JSONContent): JSONContent | null {
  if (!node) return null;

  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findFirstRenderableNode(child);
      if (found?.type === "paragraph") return found;
    }
    return node[0] ?? null;
  }

  if (
    node.type === "paragraph" &&
    node.content?.some((c) => c.type === "text")
  ) {
    return node;
  }

  if (node.type === "text") {
    return node;
  }

  if (node.content) {
    for (const child of node.content) {
      const found = findFirstRenderableNode(child);
      if (found) return found;
    }
  }

  return null;
}

function extractText(node: JSONContent): string {
  if (!node) return "";

  if (node.type === "text") return node.text ?? "";

  if (node.content) {
    return node.content.map((child) => extractText(child)).join("");
  }

  return "";
}
