import { getUserInfo } from "@/actions/auth";
import LandingPage from "@/components/landing-page";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const user = await getUserInfo();
  if (!user) return <LandingPage />;
  return (
    <form
      action={async () => {
        "use server";
        auth.api.signOut({
          headers: await headers(),
        });
      }}
      className="py-20"
    >
      <Button variant="destructive">Sign Out</Button>
    </form>
  );
}
