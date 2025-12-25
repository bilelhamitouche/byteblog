import { getUserInfo } from "@/actions/auth";
import { POST_LIMIT } from "@/lib/constants";
import { getPublishedPosts, getPublishedPostsCount } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ authorId: string }> },
) {
  const { searchParams } = new URL(req.url);
  const { authorId } = await params;
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string)
    : 0;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit") as string)
    : POST_LIMIT;
  const user = await getUserInfo();
  const [posts, total] = await Promise.all([
    getPublishedPosts(
      page * limit,
      limit,
      user?.id ?? null,
      undefined,
      authorId,
    ),
    getPublishedPostsCount(undefined, authorId),
  ]);
  return NextResponse.json({
    posts: posts,
    currentPage: page,
    hasMore: total ? (page + 1) * limit < total : false,
  });
}
