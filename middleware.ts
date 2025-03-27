import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export default async function middleware(req: NextRequest) {
  const session = await getSession(); // Pass cookies to getSession
  const { pathname } = req.nextUrl;

  // If trying to access protected routes without auth, redirect to signin
  if (pathname.startsWith("/dashboard") && (!session || !session.user)) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // If trying to access auth pages while already authenticated, redirect to dashboard
  if (pathname.startsWith("/auth") && session && session.user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
