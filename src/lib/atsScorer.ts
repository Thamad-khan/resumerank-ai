export function calculateATS(
  candidateSkills: string[],
  jobSkills: string[]
) {
  const normalize = (skill: string) =>
    skill
      .toLowerCase()
      .replace(/\./g, "")
      .replace(/js/g, "javascript")
      .replace(/\s+/g, "")
      .trim();

  const candidate = candidateSkills.map(normalize);

  const job = jobSkills
    .filter((s) => s.trim() !== "")
    .map(normalize);

  const matched = job.filter((skill) =>
    candidate.includes(skill)
  );

  const missing = job.filter(
    (skill) => !matched.includes(skill)
  );

  const score =
    job.length === 0
      ? 0
      : Math.round((matched.length / job.length) * 100);

  return {
    score,
    matched,
    missing,
  };
}