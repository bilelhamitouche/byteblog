import { getAuthorBio, getUserByUsernameOrEmail } from "@/lib/queries";

export default async function Author({ params }: { params: Promise<{ authorId: string }> }) {
  const authorUsername = decodeURIComponent((await params).authorId);
  const user = await getUserByUsernameOrEmail(authorUsername.split("@")[1]);
  const authorProfile = await getAuthorBio(user.id);
  return (
    <div className="p-8 py-28 w-full h-full flex">
      <div className="p-8">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-500 dark:text-gray-300">{authorProfile?.bio}</p>
      </div>
      <aside></aside>
    </div>
  )
}
