import { COMMENT_LIMIT } from "@/lib/constants";
import { getCommentsByPostId, getCommentsCount } from "@/lib/queries";
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
  const [comments, total] = await Promise.all([
    getCommentsByPostId(postId, page * limit, limit),
    getCommentsCount(postId),
  ]);
  return NextResponse.json({
    comments: comments,
    currentPage: page,
    // hasMore: total && page * limit < total,
    hasMore: comments && comments.length === limit,
  });
}
