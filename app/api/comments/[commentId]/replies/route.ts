import { getUserInfo } from "@/actions/auth";
import { getCommentReplies } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ commentId: string }> },
) {
  const { commentId } = await params;
  const user = await getUserInfo();
  const replies = await getCommentReplies(commentId, user?.id ?? null);
  return NextResponse.json(replies);
}
