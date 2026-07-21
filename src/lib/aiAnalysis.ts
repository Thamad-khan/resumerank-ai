export function analyzeResume(
  score: number,
  matched: string[],
  missing: string[]
) {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  // Strengths
  if (score >= 80) {
    strengths.push("Excellent match for the Job Description.");
  } else if (score >= 60) {
    strengths.push("Good skill match.");
  } else {
    strengths.push("Basic skill match.");
  }

  if (matched.length > 0) {
    strengths.push(
      `Has ${matched.length} matching skill(s): ${matched.join(", ")}.`
    );
  }

  // Weaknesses
  if (missing.length > 0) {
    weaknesses.push(
      `Missing ${missing.length} important skill(s): ${missing.join(", ")}.`
    );
  }

  // Suggestions
  if (missing.includes("Docker")) {
    suggestions.push("Learn Docker and containerization.");
  }

  if (missing.includes("AWS")) {
    suggestions.push("Gain experience with AWS cloud services.");
  }

  if (missing.includes("Git")) {
    suggestions.push("Use Git and GitHub for version control.");
  }

  if (missing.includes("Node.js")) {
    suggestions.push("Build backend projects using Node.js.");
  }

  if (missing.includes("React")) {
    suggestions.push("Practice building React applications.");
  }

  if (suggestions.length === 0) {
    suggestions.push("Keep improving your projects and resume.");
  }

  let recommendation = "";

  if (score >= 80) {
    recommendation = "🟢 Highly Recommended";
  } else if (score >= 60) {
    recommendation = "🟡 Recommended";
  } else {
    recommendation = "🔴 Needs Improvement";
  }

  return {
    strengths,
    weaknesses,
    suggestions,
    recommendation,
  };
}