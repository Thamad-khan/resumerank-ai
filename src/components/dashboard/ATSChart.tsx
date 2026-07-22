"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Candidate {
  name?: string;
  ats: {
    score: number;
  };
}

interface ATSChartProps {
  candidates: Candidate[];
}

export default function ATSChart({
  candidates,
}: ATSChartProps) {
  const data = candidates.map((candidate, index) => ({
    name: candidate.name || `Candidate ${index + 1}`,
    score: candidate.ats.score,
  }));

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        ATS Score Comparison
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />

          <Bar
            dataKey="score"
            fill="#06b6d4"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}