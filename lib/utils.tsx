import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AVATAR_COLORS } from "./constants";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import { JSONContent } from "@tiptap/react";
import CodeBlock from "@/components/CodeBlock";
import { ReactNode } from "react";

// Tailwind merge function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Avatar colors
export function generateAvatarColors(name: string) {
  const colorIndex = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[colorIndex];
}

// Custom heading for TipTap
export const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level;

    const classMap: Record<number, string> = {
      1: "text-3xl font-bold mt-6 mb-4",
      2: "text-2xl font-semibold mt-5 mb-3",
      3: "text-xl font-medium mt-4 mb-2",
      4: "text-lg font-medium mt-3 mb-2",
      5: "text-base font-medium mt-2 mb-1",
      6: "text-sm font-medium mt-1 mb-1",
    };

    return [
      `h${level}`,
      {
        ...HTMLAttributes,
        class: classMap[level] || "",
      },
      0,
    ];
  },
});

// Custom bullet list for TipTap
export const CustomBulletList = BulletList.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "ul",
      {
        ...HTMLAttributes,
        class: "list-disc list-inside ml-6 space-y-1",
      },
      0,
    ];
  },
});

// Custom ordered list for TipTap
export const CustomOrderedList = OrderedList.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "ol",
      {
        ...HTMLAttributes,
        class: "list-decimal list-inside ml-6 space-y-1",
      },
      0,
    ];
  },
});

// Custom List item for TipTap
export const CustomListItem = ListItem.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "li",
      {
        ...HTMLAttributes,
        class: "leading-relaxed",
      },
      0,
    ];
  },
});

const lowlight = createLowlight(all);

// Custom code block for TipTap
export const CustomCodeBlock = CodeBlockLowlight.extend({
  renderHTML({ node, HTMLAttributes }) {
    return [
      "pre",
      {
        ...HTMLAttributes,
        class: "hljs my-4 p-4 rounded-lg overflow-x-auto font-mono text-base",
      },
      [
        "code",
        {
          class: `language-${node.attrs.language || ""}`,
        },
        0,
      ],
    ];
  },
}).configure({ lowlight });

export function renderPost(postContent: JSONContent): ReactNode {
  if (!postContent.type) {
    return null;
  }
  switch (postContent.type) {
    case "doc":
      if (postContent.content) {
        return (
          <article className="flex flex-col gap-2 py-8 leading-8 sm:text-lg">
            {postContent.content.map((child, index) => (
              <div key={index}>{renderPost(child)}</div>
            ))}
          </article>
        );
      } else {
        return null;
      }
    case "paragraph":
      if (postContent.content) {
        return (
          <p>
            {postContent.content.map((child, index) => (
              <span key={index}>{renderPost(child)}</span>
            ))}
          </p>
        );
      } else {
        return null;
      }
    case "codeBlock":
      if (postContent.content && postContent.content.length > 0) {
        const codeText = postContent.content
          .map((child) => child.text ?? "")
          .join("\n");
        return <CodeBlock code={codeText} />;
      }
      return null;
    case "bulletList":
      if (postContent.content) {
        return (
          <ul className="flex flex-col gap-1 pl-8 list-disc">
            {postContent.content.map((child, index) => (
              <div key={index}>{renderPost(child)}</div>
            ))}
          </ul>
        );
      } else {
        return null;
      }
    case "orderedList":
      if (postContent.content) {
        return (
          <ol className="flex flex-col gap-1 pl-8 leading-relaxed list-decimal">
            {postContent.content.map((child, index) => (
              <div key={index}>{renderPost(child)}</div>
            ))}
          </ol>
        );
      } else {
        return null;
      }
    case "listItem":
      if (postContent.content) {
        return (
          <li>
            {postContent.content.map((child, index) => (
              <div key={index} className="flex">
                {renderPost(child)}
              </div>
            ))}
          </li>
        );
      } else {
        return null;
      }
    case "heading":
      if (postContent.content) {
        switch (postContent.attrs?.level) {
          case 1:
            return (
              <h1 className="mt-6 mb-4 text-3xl font-bold">
                {postContent.content.map((child, index) => (
                  <span key={index}>{renderPost(child)}</span>
                ))}
              </h1>
            );
          case 2:
            return (
              <h2 className="mt-5 mb-3 text-2xl font-semibold">
                {postContent.content.map((child, index) => (
                  <span key={index}>{renderPost(child)}</span>
                ))}
              </h2>
            );
          case 3:
            return (
              <h3 className="mt-4 mb-2 text-xl font-medium">
                {postContent.content.map((child, index) => (
                  <span key={index}>{renderPost(child)}</span>
                ))}
              </h3>
            );
          case 4:
            return (
              <h3 className="mt-3 mb-2 text-lg font-medium">
                {postContent.content.map((child, index) => (
                  <span key={index}>{renderPost(child)}</span>
                ))}
              </h3>
            );
          case 5:
            return (
              <h5 className="mt-2 mb-1 text-base font-medium">
                {postContent.content.map((child, index) => (
                  <span key={index}>{renderPost(child)}</span>
                ))}
              </h5>
            );
          case 6:
            return (
              <h6 className="mt-1 mb-1 text-sm font-medium">
                {postContent.content.map((child, index) => (
                  <span key={index}>{renderPost(child)}</span>
                ))}
              </h6>
            );
          default:
            return null;
        }
      } else {
        return null;
      }
    case "text":
      return (
        <span className={`${getClassNameFromMarks(postContent.marks)}`}>
          {postContent.text}
        </span>
      );
    default:
      return <p>Nothing here</p>;
  }
}

function getClassNameFromMarks(marks: JSONContent["marks"]) {
  if (marks) {
    return marks
      .map((mark) => {
        switch (mark.type) {
          case "bold":
            return " text-bold";
          case "underline":
            return " underline";
          case "italic":
            return " italic";
          case "strike":
            return " line-through";
          default:
            return " ";
        }
      })
      .join(" ");
  }
}

export function findFirstParagraph(node: JSONContent): JSONContent | null {
  // If the node is an array, iterate through it
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findFirstParagraph(child);
      if (found) return found;
    }
    return null;
  }

  // Now node is a single JSONContent object
  if (!node) return null;

  if (node.type === "paragraph") return node;

  if (node.content) {
    for (const child of node.content) {
      const found = findFirstParagraph(child);
      if (found) return found;
    }
  }

  return null;
}

export function findFirstText(node: JSONContent): JSONContent | null {
  if (!node) return null;

  // Handle array of nodes at the top level
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findFirstText(child);
      if (found) return found;
    }
    return null;
  }

  // If this is a paragraph, return it
  if (node.type === "paragraph") return node;

  // If this is a text node, return it
  if (node.type === "text") return node;

  // Recurse into children if present
  if (node.content) {
    for (const child of node.content) {
      const found = findFirstText(child);
      if (found) return found;
    }
  }

  return null;
}

export function FirstContent({ content }: { content: JSONContent }) {
  // Recursive function to find first paragraph with text or first text node
  function findFirstRenderableNode(node: JSONContent): JSONContent | null {
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
