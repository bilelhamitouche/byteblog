import { searchTopics } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit") as string)
    : 5;
  const topics = await searchTopics(search, limit);
  return NextResponse.json(topics);
}
