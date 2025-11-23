import { getUserInfo } from "@/actions/auth";
import EditPost from "@/components/EditPostForm";
import { redirect } from "next/navigation";

export default async function Write() {
  const user = await getUserInfo();
  if (!user) redirect("/login");
  const initialPost = {
    id: "",
    title: "",
    image: "",
    content:
      '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Hello World! 🌎️"}]},{"type":"paragraph"}]}',
    published: false,
  };
  return <EditPost initialPost={initialPost} />;
}
