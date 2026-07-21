const skills = [
  "Java",
  "Python",
  "C",
  "C++",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Bootstrap",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Git",
  "GitHub",
  "Docker",
  "AWS",
  "Linux",
  "Kubernetes",
  "REST API",
];

export function parseJobDescription(text: string) {
  const foundSkills = skills.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );

  // First non-empty line = Job Title
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const title = lines[0] || "Untitled Job";

  // Temporary company name
  const company = "Unknown Company";

  return {
    title,
    company,
    skills: [...new Set(foundSkills)],
  };
}