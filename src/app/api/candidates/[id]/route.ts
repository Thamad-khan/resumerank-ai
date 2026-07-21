import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.candidate.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    console.error("Delete Candidate Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete candidate",
      },
      {
        status: 500,
      }
    );
  }
}