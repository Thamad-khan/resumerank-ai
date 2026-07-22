import { NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdfParser";
import { parseJobDescription } from "@/lib/jobParser";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    console.log("FormData Keys:", [...formData.keys()]);

    const file = formData.get("job") as File;

    console.log("File:", file);
    console.log("File Name:", file?.name);
    console.log("File Size:", file?.size);
    console.log("File Type:", file?.type);

    if (!file) {
      return NextResponse.json(
        { error: "No Job Description uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract text from PDF
    const result = await extractTextFromPDF(buffer);

if (!result.success) {
  return NextResponse.json(
    { error: "Failed to read Job Description" },
    { status: 500 }
  );
}

const text = result.text;

// Parse Job Description
const parsed = parseJobDescription(text);

    // Get logged-in user
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Save Job
    const job = await prisma.job.create({
      data: {
        title: parsed.title || "Untitled Job",
        company: parsed.company || "Unknown Company",
        description: text,
        skills: parsed.skills,
        userId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      parsed,
      job,
      text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}