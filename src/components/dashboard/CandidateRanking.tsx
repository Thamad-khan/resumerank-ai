"use client";

import { useEffect, useState } from "react";
import DownloadReport from "@/components/dashboard/DownloadReport";

interface Candidate {
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  skills: string[];

  ats: {
    score: number;
    matched: string[];
    missing: string[];
  };

  analysis?: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    recommendation: string;
  };
}

export default function CandidateRanking() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = () => {
    const stored: Candidate[] = JSON.parse(
      localStorage.getItem("candidates") || "[]"
    );

    stored.sort((a, b) => b.ats.score - a.ats.score);

    setCandidates(stored);
  };

  const medal = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  const deleteCandidate = (email: string) => {
    const updated = candidates.filter(
      (candidate) => candidate.email !== email
    );

    localStorage.setItem(
      "candidates",
      JSON.stringify(updated)
    );

    setCandidates(updated);
  };

  const clearAllCandidates = () => {
    if (!confirm("Delete all candidates?")) return;

    localStorage.removeItem("candidates");
    setCandidates([]);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const query = search.toLowerCase();

    const matchesSearch =
      candidate.name.toLowerCase().includes(query) ||
      candidate.email.toLowerCase().includes(query) ||
      candidate.skills.some((skill) =>
        skill.toLowerCase().includes(query)
      );

    let matchesFilter = true;

    if (filter === "Excellent")
      matchesFilter = candidate.ats.score >= 80;

    if (filter === "Good")
      matchesFilter =
        candidate.ats.score >= 60 &&
        candidate.ats.score < 80;

    if (filter === "Average")
      matchesFilter =
        candidate.ats.score >= 40 &&
        candidate.ats.score < 60;

    if (filter === "Poor")
      matchesFilter = candidate.ats.score < 40;

    return matchesSearch && matchesFilter;
  });

  if (candidates.length === 0) {
    return (

      <div className="text-center text-gray-400 mt-20 text-xl">
        No Candidates Uploaded Yet
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">

      <div className="flex flex-col lg:flex-row gap-4">

        <input
          type="text"
          placeholder="🔍 Search by name, email or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:flex-1 rounded-xl border border-cyan-500 bg-slate-900 px-4 py-3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full lg:w-56 rounded-xl border border-cyan-500 bg-slate-900 px-4 py-3"
        >
          <option>All</option>
          <option>Excellent</option>
          <option>Good</option>
          <option>Average</option>
          <option>Poor</option>
        </select>

        <button
          onClick={clearAllCandidates}
          className="w-full lg:w-auto bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl"
        >
          🗑 Clear All
        </button>

      </div>

      {filteredCandidates.length === 0 ? (
        <div className="text-center text-gray-400 text-xl">
          No matching candidates found.
        </div>
      ) : (
        filteredCandidates.map((candidate, index) => (
          <div
            key={index}
            className="rounded-2xl border border-cyan-500 bg-slate-900 p-4 md:p-6 shadow-lg"
          >

            <div className="flex flex-col md:flex-row md:justify-between gap-6">

              <div>

                <h2 className="text-xl md:text-2xl font-bold text-cyan-400 break-words">
                  {medal(index)} {candidate.name}
                </h2>

                <p className="text-gray-400 mt-2 break-all">
                  📧 {candidate.email}
                </p>

                <p className="text-gray-400">
                  📱 {candidate.phone}
                </p>

                <p className="mt-3">
                  <strong>🎓 Education:</strong>{" "}
                  {candidate.education}
                </p>

                <p>
                  <strong>💼 Experience:</strong>{" "}
                  {candidate.experience}
                </p>

              </div>

              <div className="md:text-right">

                <p className="text-4xl md:text-5xl font-bold text-green-400">
                  {candidate.ats.score}%
                </p>

                <p className="text-gray-400">
                  ATS Score
                </p>

              </div>

            </div>

            <div className="mt-6">

              <h3 className="font-bold text-cyan-400 mb-3">
                Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-cyan-500 text-black px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>

                        <div className="flex flex-col md:flex-row gap-4 mt-6">

              <DownloadReport candidate={candidate} />

              <button
                onClick={() => deleteCandidate(candidate.email)}
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition"
              >
                🗑 Delete
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
}