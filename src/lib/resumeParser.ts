const SKILLS = [
  "Java",
  "Python",
  "C",
  "C++",
  "JavaScript",
  "TypeScript",
  "React",
  "ReactJS",
  "Next.js",
  "NextJS",
  "Node.js",
  "NodeJS",
  "Express",
  "Express.js",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "SQL",
  "HTML",
  "CSS",
  "Tailwind",
  "Tailwind CSS",
  "Git",
  "GitHub",
  "Docker",
  "AWS",
  "Linux",
  "Kubernetes",
  "REST API",
];

export function parseResume(text: string) {
  const cleanText = text
    .replace(/\r/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase();

  // Email
  const email =
    text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";

  // Phone
  const phone =
    text.match(/(\+91[\s-]?)?[6-9]\d{9}/)?.[0] || "";

  // Name
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const name = lines[0] || "";

  // Skills
  const skills = SKILLS.filter((skill) =>
    cleanText.includes(skill.toLowerCase())
  );

  // Remove duplicates
  const uniqueSkills = [...new Set(skills)];

  // Education
  const educationKeywords = [
    "b.tech",
    "bachelor",
    "be",
    "b.e",
    "m.tech",
    "mca",
    "bsc",
    "msc",
    "degree",
    "college",
    "university",
  ];

  const education =
    lines.find((line) =>
      educationKeywords.some((word) =>
        line.toLowerCase().includes(word)
      )
    ) || "";

  // Experience
  const experienceKeywords = [
    "intern",
    "internship",
    "experience",
    "software engineer",
    "developer",
    "frontend",
    "backend",
    "full stack",
    "project",
  ];

  const experience =
    lines.find((line) =>
      experienceKeywords.some((word) =>
        line.toLowerCase().includes(word)
      )
    ) || "";

  return {
    name,
    email,
    phone,
    skills: uniqueSkills,
    education,
    experience,
  };
}