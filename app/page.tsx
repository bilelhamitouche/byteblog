import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/login");
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full">
      <p>{session?.user.name}</p>
      <p>{session?.user.username}</p>
      <form
        action={async () => {
          "use server";
          auth.api.signOut({
            headers: await headers(),
          });
          redirect("/login");
        }}
      >
        <Button variant="destructive">Sign Out</Button>
      </form>
    </div>
  );
}
