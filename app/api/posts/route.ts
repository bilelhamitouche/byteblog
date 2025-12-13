import { getUserInfo } from "@/actions/auth";
import { POST_LIMIT } from "@/lib/constants";
import {
  getPublishedPosts,
  getPublishedPostsCount,
  searchPublishedPosts,
  searchPublishedPostsCount,
} from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string)
    : 0;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit") as string)
    : POST_LIMIT;
  const user = await getUserInfo();
  const hasSearch = typeof search === "string" && search.trim().length > 0;
  const [posts, total] = await Promise.all([
    hasSearch
      ? searchPublishedPosts(search, page * limit, limit, user?.id ?? null)
      : getPublishedPosts(page * limit, limit, user?.id ?? null),
    hasSearch ? searchPublishedPostsCount(search) : getPublishedPostsCount(),
  ]);
  return NextResponse.json({
    posts: posts,
    currentPage: page,
    hasMore: total && page * limit < total,
  });
}
