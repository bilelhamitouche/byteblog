import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { avatarColors } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAvatarColors(name: string) {
  const colorIndex = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[colorIndex];
}
