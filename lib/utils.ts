import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AVATAR_COLORS } from "./constants";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

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
