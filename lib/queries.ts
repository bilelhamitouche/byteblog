import "server-only";
import { db, user } from "./drizzle";
import { eq } from "drizzle-orm";
import { isAuthenticated } from "@/actions/auth";
import { redirect } from "next/navigation";

export async function getUserByUsername(username: string) {
  if (!(await isAuthenticated())) redirect("/login");
  const newUser = await db
    .selectDistinct()
    .from(user)
    .where(eq(user.username, username));
  return newUser;
}
