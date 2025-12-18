import { getUserInfo } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUserInfo();
  if (!user) {
    redirect("/landing");
  } else {
    redirect("/posts");
  }
}
