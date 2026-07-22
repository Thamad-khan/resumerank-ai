import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractTextFromPDF } from "@/lib/pdfParser";
import { parseResume } from "@/lib/resumeParser";
import { calculateATS } from "@/lib/atsScorer";
import { analyzeResume } from "@/lib/aiAnalysis";

export async function POST(request: Request) {
  try {
    console.log("========== Resume Upload Started ==========");

    const formData = await request.formData();

    console.log("FormData Keys:", [...formData.keys()]);

    const file = formData.get("resume") as File | null;

    console.log("File:", file);
    console.log("File Name:", file?.name);
    console.log("File Size:", file?.size);
    console.log("File Type:", file?.type);

    // Check if file exists
    if (!file) {
      console.log("❌ Resume file not received.");

      return NextResponse.json(
        {
          success: false,
          error: "No resume uploaded",
        },
        {
          status: 400,
        }
      );
    }

    // Job Skills
    const jobSkills = JSON.parse(
      (formData.get("jobSkills") as string) || "[]"
    );

    const jobId = formData.get("jobId") as string | null;

      console.log("Job ID:", jobId);

    console.log("Job Skills:", jobSkills);

    // Convert PDF
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("PDF Buffer Size:", buffer.length);

    // Extract text
    const result = await extractTextFromPDF(buffer);

    console.log("PDF Extraction Success:", result.success);

    if (!result.success) {
  return NextResponse.json(
    {
      success: false,
      error: result.error,
    },
    {
      status: 500,
    }
  );
}

    const text = result.text;

    console.log("Extracted Text Length:", text.length);

    // Parse Resume
    const parsed = parseResume(text);

    console.log("Parsed Resume:");
    console.log(parsed);

    // ATS Score
    const ats = calculateATS(parsed.skills, jobSkills);

    console.log("ATS Result:");
    console.log(ats);

    // AI Analysis
    

    const analysis = analyzeResume(
  ats.score,
  ats.matched,
  ats.missing
);

console.log("AI Analysis:");
console.log(analysis);

    // Save Candidate
    console.log("Saving Candidate...");
    console.log("ATS Score:", ats.score);
console.log("Matched Skills:", ats.matched);
console.log("Missing Skills:", ats.missing);
console.log("Strengths:", analysis.strengths);
console.log("Recommendation:", analysis.recommendation);


    const candidate = await prisma.candidate.upsert({
      where: {
         email: parsed.email,
        },
      update: {
          name: parsed.name,
          phone: parsed.phone,
          education: parsed.education,
          experience: parsed.experience,
          skills: parsed.skills,
        },
    create: {
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone,
      education: parsed.education,
      experience: parsed.experience,
      skills: parsed.skills,
    },
  });
    

    console.log("✅ Candidate Saved:", candidate.id);

    if (jobId) {
  await prisma.application.create({
    data: {
      candidateId: candidate.id,
      jobId,

      atsScore: ats.score,
      matchedSkills: ats.matched,
      missingSkills: ats.missing,

      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      suggestions: analysis.suggestions,

      recommendation: analysis.recommendation,

      resumeText: text,
    },
  });

  console.log("✅ Application Created");
}

    console.log("========== Upload Finished ==========");

    return NextResponse.json({
      success: true,
      candidate,
      parsed,
      ats,
      analysis,
      text,
    });
  } 
   
  catch (error) {
  console.error("❌ Upload Error:", error);

  return NextResponse.json(
    {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error",
    },
    {
      status: 500,
    }
  );
  }
}
