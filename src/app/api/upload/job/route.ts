import { NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdfParser";
import { parseJobDescription } from "@/lib/jobParser";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("job") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No Job Description uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await extractTextFromPDF(buffer);

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to read Job Description" },
        { status: 500 }
      );
    }

    const parsed = parseJobDescription(result.text);

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

const job = await prisma.job.create({
  data: {
    title: parsed.title || "Untitled Job",
    company: parsed.company || "Unknown Company",
    description: result.text,
    skills: parsed.skills,
    userId: user.id,
  },
});

    return NextResponse.json({
  success: true,
  parsed,
  job,
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}