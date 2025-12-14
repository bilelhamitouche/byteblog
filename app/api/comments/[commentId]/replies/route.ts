import { getCommentReplies } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ commentId: string }> },
) {
  const { commentId } = await params;
  const replies = await getCommentReplies(commentId);
  return NextResponse.json(replies);
}
