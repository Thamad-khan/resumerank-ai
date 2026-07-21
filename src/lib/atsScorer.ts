export function calculateATS(
  candidateSkills: string[],
  jobSkills: string[]
) {
  // Remove empty skills
  const cleanedJobSkills = jobSkills.filter(
    (skill) => skill.trim() !== ""
  );

  const matched = cleanedJobSkills.filter((skill) =>
    candidateSkills.some(
      (candidate) =>
        candidate.toLowerCase() === skill.toLowerCase()
    )
  );

  const missing = cleanedJobSkills.filter(
    (skill) => !matched.includes(skill)
  );

  // Prevent NaN when no JD skills exist
  const score =
    cleanedJobSkills.length === 0
      ? 0
      : Math.round(
          (matched.length / cleanedJobSkills.length) * 100
        );

  return {
    score,
    matched,
    missing,
  };
}