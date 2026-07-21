const SKILLS = [
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
  "MongoDB",
  "MySQL",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Git",
  "GitHub",
  "Docker",
  "AWS",
  "Linux",
];

export function parseResume(text: string) {
  // Email
  const email =
    text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";

  // Phone
  const phone =
    text.match(/(\+91[\s-]?)?[6-9]\d{9}/)?.[0] || "";

  // Name (first non-empty line)
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const name = lines[0] || "";

  // Skills
  const skills = SKILLS.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );

  // Education
  const educationKeywords = [
    "B.Tech",
    "Bachelor",
    "BE",
    "B.E",
    "M.Tech",
    "MCA",
    "BSc",
    "Degree",
    "University",
    "College",
  ];

  const education = lines.find((line) =>
    educationKeywords.some((word) =>
      line.toLowerCase().includes(word.toLowerCase())
    )
  ) || "";

  // Experience
  const experienceKeywords = [
    "Intern",
    "Internship",
    "Experience",
    "Software Engineer",
    "Developer",
    "Frontend",
    "Backend",
    "Full Stack",
  ];

  const experience = lines.find((line) =>
    experienceKeywords.some((word) =>
      line.toLowerCase().includes(word.toLowerCase())
    )
  ) || "";

  return {
    name,
    email,
    phone,
    skills,
    education,
    experience,
  };
}