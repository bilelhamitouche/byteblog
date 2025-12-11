import { getPublishedPosts } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("skip") as string)
    : 5;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit") as string)
    : 5;
  const posts = await getPublishedPosts(search, page * limit, limit);
  return NextResponse.json({
    posts: posts,
    currentPage: page,
    hasMore: posts ? posts.length < limit : false,
  });
}
