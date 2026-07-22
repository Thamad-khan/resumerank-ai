"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  atsScore: number;
  recommendation: string;
};

export default function CandidateList() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  

  const loadCandidates = useCallback(async () => {
  try {
    const res = await fetch("/api/candidates");
    const data = await res.json();

    if (data.success) {
      setCandidates(data.candidates);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  loadCandidates();
}, [loadCandidates]);

  async function deleteCandidate(id: string) {
    if (!confirm("Delete this candidate?")) return;

    try {
      const res = await fetch(`/api/candidates/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setCandidates((prev) =>
          prev.filter((candidate) => candidate.id !== id)
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  const filteredCandidates = useMemo(() => {
    const value = search.toLowerCase();

    return candidates.filter((candidate) => {
      return (
        candidate.name.toLowerCase().includes(value) ||
        candidate.email.toLowerCase().includes(value) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(value)
        )
      );
    });
  }, [search, candidates]);

  if (loading) {
    return (
      <p className="text-center text-gray-400">
        Loading candidates...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

      <input
        type="text"
        placeholder="🔍 Search candidate..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 mb-8 outline-none focus:border-cyan-500"
      />

      {filteredCandidates.length === 0 ? (
        <div className="bg-slate-900 rounded-xl p-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold">
            No Candidates Found
          </h2>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">

          {filteredCandidates.map((candidate) => (

            <div
              key={candidate.id}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-cyan-500 transition"
            >

              <div className="flex flex-col md:flex-row md:justify-between gap-4">

                <div>

                  <h2 className="text-xl md:text-2xl font-bold break-words">
                    {candidate.name}
                  </h2>

                  <p className="text-gray-400 break-all mt-2">
                    {candidate.email}
                  </p>

                  <p className="text-gray-400">
                    {candidate.phone}
                  </p>

                </div>

                <div
                  className={`text-4xl font-bold ${
                    candidate.atsScore >= 80
                      ? "text-green-400"
                      : candidate.atsScore >= 60
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {candidate.atsScore}%
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

                            <div className="mt-6">

                <h3 className="font-bold text-green-400">
                  Recommendation
                </h3>

                <p className="mt-2 text-gray-300 break-words">
                  {candidate.recommendation}
                </p>

              </div>

              <div className="mt-8 flex flex-col md:flex-row md:justify-end gap-3">

                <button
                  onClick={() => deleteCandidate(candidate.id)}
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition"
                >
                  🗑 Delete Candidate
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}