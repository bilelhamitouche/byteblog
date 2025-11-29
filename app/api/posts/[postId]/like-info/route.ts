import { getUserInfo } from "@/actions/auth";
import { getPost, hasUserLikedPost } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  const user = await getUserInfo();
  const [hasUserLiked, post] = await Promise.all([
    hasUserLikedPost(postId as string, user?.id as string),
    getPost(postId as string),
  ]);
  return NextResponse.json({
    hasUserLiked,
    isDisabled: user?.id === post?.authorId,
  });
}
