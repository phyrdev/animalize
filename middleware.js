import { getToken } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (req.nextUrl.pathname === "/") {
    let url = new URL(req.url);
    let redirect = url.searchParams.get("redirect");

    if (redirect == "false") {
      return NextResponse.next();
    } else {
      if (session) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } else {
        return NextResponse.next();
      }
    }
  } else if (
    req.nextUrl.pathname === "/signin" ||
    req.nextUrl.pathname === "/signup"
  ) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else {
      return NextResponse.next();
    }
  } else {
    if (!session) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/dashboard/:path*"],
};
