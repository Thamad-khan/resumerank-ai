import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // If a recruiter tries to open the student dashboard
    if (
      pathname.startsWith("/dashboard") &&
      token?.role === "RECRUITER"
    ) {
      return NextResponse.redirect(
        new URL("/recruiter/dashboard", req.url)
      );
    }

    // If a student tries to open recruiter pages
    if (
      pathname.startsWith("/recruiter") &&
      token?.role === "STUDENT"
    ) {
      return NextResponse.redirect(
        new URL("/dashboard", req.url)
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/recruiter/:path*",
  ],
};