import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractTextFromPDF } from "@/lib/pdfParser";
import { parseResume } from "@/lib/resumeParser";
import { calculateATS } from "@/lib/atsScorer";
import { analyzeResume } from "@/lib/ollama";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const jobSkills = JSON.parse(
      (formData.get("jobSkills") as string) || "[]"
    );

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract text from PDF
    const result = await extractTextFromPDF(buffer);

if (!result.success) {
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

// Parse Resume
const parsed = parseResume(text);

// Calculate ATS
const ats = calculateATS(parsed.skills, jobSkills);

// AI Analysis
let analysis = {
  strengths: [],
  weaknesses: [],
  suggestions: [],
  recommendation: "AI analysis unavailable",
};

analysis = await analyzeResume(text, jobSkills);
    console.log("Resume Skills:", parsed.skills);
    console.log("Job Skills:", jobSkills);

    // AI Analysis
    

    // Save Candidate
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

    return NextResponse.json({
      success: true,
      candidate,
      parsed,
      ats,
      analysis,
      text,
    });
  } catch (error) {
    console.error(error);

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