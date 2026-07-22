import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractTextFromPDF } from "@/lib/pdfParser";
import { parseResume } from "@/lib/resumeParser";
import { calculateATS } from "@/lib/atsScorer";
import { analyzeResume } from "@/lib/gemini";

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

    console.log("Job Skills:", jobSkills);

    // Convert PDF
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("PDF Buffer Size:", buffer.length);

    // Extract text
    const result = await extractTextFromPDF(buffer);

    console.log("PDF Extraction Success:", result.success);

    if (!result.success) {
      console.log("❌ PDF Extraction Failed");

      return NextResponse.json(
        {
          success: false,
          error: "Failed to extract PDF",
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
    let analysis = {
      strengths: [],
      weaknesses: [],
      suggestions: [],
      recommendation: "AI analysis unavailable",
    };

    analysis = await analyzeResume(text, jobSkills);

    console.log("AI Analysis:");
    console.log(analysis);

    // Save Candidate
    console.log("Saving Candidate...");

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

        atsScore: ats.score,
        matchedSkills: ats.matched,
        missingSkills: ats.missing,

        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        suggestions: analysis.suggestions,

        recommendation: analysis.recommendation,
      },
      create: {
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone,
        education: parsed.education,
        experience: parsed.experience,

        skills: parsed.skills,

        atsScore: ats.score,
        matchedSkills: ats.matched,
        missingSkills: ats.missing,

        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        suggestions: analysis.suggestions,

        recommendation: analysis.recommendation,
      },
    });

    console.log("✅ Candidate Saved:", candidate.id);

    console.log("========== Upload Finished ==========");

    return NextResponse.json({
      success: true,
      candidate,
      parsed,
      ats,
      analysis,
      text,
    });
  } catch (error) {
    console.error("❌ Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}