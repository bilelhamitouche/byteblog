import { getUserInfo } from "@/actions/auth";
import LandingPage from "@/components/landing-page";
import Posts from "@/components/Posts";

export default async function Home() {
  const user = await getUserInfo();
  if (!user) {
    return <LandingPage />;
  }
  return (
    <>
      <Posts />
    </>
  );
}
