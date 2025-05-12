import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/login");
  return (
    <div className="flex justify-center items-center h-full">
      <p>{session?.user.name}</p>
      <form
        action={async () => {
          "use server";
          auth.api.signOut({
            headers: await headers(),
          });
          redirect("/login");
        }}
      ></form>
    </div>
  );
}
