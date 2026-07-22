import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function analyzeResume(
  resume: string,
  jobSkills: string[]
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
You are an ATS Resume Screening Expert.

Job Skills:
${jobSkills.join(", ")}

Resume:
${resume}

Compare the resume with the required job skills.

Return ONLY valid JSON.

{
  "strengths": [
    "...",
    "...",
    "..."
  ],
  "weaknesses": [
    "...",
    "...",
    "..."
  ],
  "suggestions": [
    "...",
    "...",
    "..."
  ],
  "recommendation":"Hire"
}
`;

  try {
    const result = await model.generateContent(prompt);

    let content = result.response.text();

    // Remove markdown if Gemini wraps JSON
    content = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(content);
  } catch (error) {
    console.error("Gemini Error:", error);

    return {
      strengths: [],
      weaknesses: [],
      suggestions: [],
      recommendation: "AI analysis unavailable",
    };
  }
}