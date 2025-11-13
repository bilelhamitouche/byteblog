import EditPost from "@/components/EditPostForm";

export default function Write() {
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
