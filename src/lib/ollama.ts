import ollama from "ollama";

export async function analyzeResume(
  resume: string,
  jobSkills: string[]
) {
  const prompt = `
You are an ATS Resume Screening Expert.

Job Skills:
${jobSkills.join(", ")}

Resume:
${resume}

Analyze the resume and compare it with the job skills.

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
  "recommendation": "Hire"
}
`;

  const response = await ollama.chat({
    model: "llama3.2:latest",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.message?.content ?? "";
    
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error("Ollama JSON Parse Error:", error);

    return {
      strengths: [],
      weaknesses: [],
      suggestions: [],
      recommendation: "Unable to analyze",
    };
  }
}