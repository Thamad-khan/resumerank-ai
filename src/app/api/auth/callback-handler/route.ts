import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL));
  }

  const role = session.user.role;

  if (role === "RECRUITER") {
    return NextResponse.redirect(
      new URL("/recruiter/dashboard", process.env.NEXTAUTH_URL)
    );
  }

  return NextResponse.redirect(
    new URL("/dashboard", process.env.NEXTAUTH_URL)
  );
}