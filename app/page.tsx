import { getUserInfo } from "@/actions/auth";
import LandingPage from "@/components/landing-page";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUserInfo();
  if (!user) {
    return <LandingPage />;
  } else {
    redirect("/posts");
  }
}
