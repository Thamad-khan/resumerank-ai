import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: {
        atsScore: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      candidates,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch candidates",
      },
      {
        status: 500,
      }
    );
  }
}