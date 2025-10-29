import EditPost from "@/components/EditPostForm";

export default function Write() {
  const initialPost = {
    id: "",
    title: "",
    image: "",
    content:
      '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Hello World! 🌎️"}]},{"type":"paragraph"}]}',
  };
  return <EditPost initialPost={initialPost} />;
}
