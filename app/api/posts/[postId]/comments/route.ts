import { getUserInfo } from "@/actions/auth";
import { COMMENT_LIMIT } from "@/lib/constants";
import { getCommentsByPostId } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const postId = (await params).postId;
  const searchParams = new URLSearchParams(req.url);
  const page = parseInt(searchParams.get("page") ?? "0");
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit") as string)
    : COMMENT_LIMIT;
  const user = await getUserInfo();
  const comments = await getCommentsByPostId(
    postId,
    page * limit,
    limit,
    user?.id ?? null,
  );
  return NextResponse.json({
    comments: comments,
    currentPage: page,
    hasMore: comments && comments.length === limit,
  });
}
