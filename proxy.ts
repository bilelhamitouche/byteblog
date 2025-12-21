import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const hasSession = req.cookies.has("better-auth.session_token");

  if (hasSession && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/posts", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
