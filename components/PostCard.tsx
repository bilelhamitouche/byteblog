import { Card, CardDescription, CardTitle } from "./ui/card";

interface PostCardProps {
  title: string;
  image: string;
  content: string;
  author: string;
}

export default function PostCard({
  title,
  image,
  content,
  author,
}: PostCardProps) {
  return (
    <Card>
      <CardDescription>{author}</CardDescription>
      <CardTitle>{title}</CardTitle>
    </Card>
  );
}
