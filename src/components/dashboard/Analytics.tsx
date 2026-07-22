"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Candidate {
  name: string;
  ats: {
    score: number;
  };
}

export default function Analytics() {
  const [candidates] = useState<Candidate[]>(() => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem("candidates") || "[]");
  } catch {
    return [];
  }
});

  

  const chartData = candidates.map((candidate) => ({
    name: candidate.name || "Unknown",
    score: candidate.ats.score,
  }));

  const total = candidates.length;

  const average =
    total === 0
      ? 0
      : Math.round(
          candidates.reduce(
            (sum, c) => sum + c.ats.score,
            0
          ) / total
        );

  const highest =
    total === 0
      ? 0
      : Math.max(...candidates.map((c) => c.ats.score));

  const lowest =
    total === 0
      ? 0
      : Math.min(...candidates.map((c) => c.ats.score));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8">

      {/* Heading */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
          📊 Analytics Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          View candidate performance and ATS statistics.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-slate-900 rounded-2xl p-6 border border-cyan-500">
          <h3 className="text-gray-400">
            Total Candidates
          </h3>

          <p className="text-3xl md:text-4xl font-bold text-cyan-400 mt-3">
            {total}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-green-500">
          <h3 className="text-gray-400">
            Average ATS
          </h3>

          <p className="text-3xl md:text-4xl font-bold text-green-400 mt-3">
            {average}%
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-yellow-500">
          <h3 className="text-gray-400">
            Highest ATS
          </h3>

          <p className="text-3xl md:text-4xl font-bold text-yellow-400 mt-3">
            {highest}%
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-red-500">
          <h3 className="text-gray-400">
            Lowest ATS
          </h3>

          <p className="text-3xl md:text-4xl font-bold text-red-400 mt-3">
            {lowest}%
          </p>
        </div>

      </div>

      {/* Chart */}
      <div className="bg-slate-900 rounded-2xl border border-slate-700 p-4 md:p-6">

        <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-6">
          ATS Score Comparison
        </h2>

        <div className="h-[300px] md:h-[450px] w-full">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={chartData}>

              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                interval={0}
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="score"
                fill="#06b6d4"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Empty State */}

      {total === 0 && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-10 text-center">

          <h2 className="text-xl md:text-2xl font-bold">
            No Analytics Available
          </h2>

          <p className="text-gray-400 mt-3">
            Upload resumes to generate analytics.
          </p>

        </div>
      )}

    </div>
  );
}