import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const applications = await prisma.application.findMany({
      where: {
        jobId: id,
      },
      include: {
        candidate: true,
      },
      orderBy: {
        atsScore: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load applications",
      },
      {
        status: 500,
      }
    );
  }
}