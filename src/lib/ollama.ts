import ollama from "ollama";

export async function analyzeResume(
  resume: string,
  jobSkills: string[]
) {
  try {
    const prompt = `
You are an ATS Resume Screening Expert.

Job Skills:
${jobSkills.join(", ")}

Resume:
${resume}

Return ONLY valid JSON.

{
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "recommendation": ""
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

    return JSON.parse(response.message.content);
  } catch (error) {
    console.log("Ollama unavailable. Skipping AI analysis.");

    return {
      strengths: [],
      weaknesses: [],
      suggestions: [],
      recommendation: "AI analysis unavailable",
    };
  }
}