import { JSONContent } from "@tiptap/react";

export default function PreviewContent({
  content,
}: {
  content: JSONContent | JSONContent[];
}) {
  function findFirstRenderableNode(
    node: JSONContent | JSONContent[],
  ): JSONContent | null {
    if (!node) return null;

    if (Array.isArray(node)) {
      for (const child of node) {
        const found = findFirstRenderableNode(child);
        if (found) return found;
      }
      return null;
    }

    // If paragraph has text inside
    if (
      node.type === "paragraph" &&
      node.content?.some((c) => c.type === "text")
    ) {
      return node;
    }

    // If this is a standalone text node
    if (node.type === "text") return node;

    // Recurse into children
    if (node.content) {
      for (const child of node.content) {
        const found = findFirstRenderableNode(child);
        if (found) return found;
      }
    }

    return null;
  }

  const firstNode = findFirstRenderableNode(content);

  if (!firstNode) return null;

  // Render JSX inline
  if (firstNode.type === "paragraph") {
    return (
      <p>
        {firstNode.content
          ?.filter((c) => c.type === "text")
          .map((child, index) => (
            <span
              key={index}
              className={child.marks?.map((m) => m.type).join(" ")}
            >
              {child.text}
            </span>
          ))}
      </p>
    );
  }

  if (firstNode.type === "text") {
    return (
      <span className={firstNode.marks?.map((m) => m.type).join(" ")}>
        {firstNode.text}
      </span>
    );
  }

  return null;
}
