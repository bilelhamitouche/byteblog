export default function PostContent({ content }: { content: string }) {
  console.log(content);
  return <div className="text-base">{content}</div>;
}
