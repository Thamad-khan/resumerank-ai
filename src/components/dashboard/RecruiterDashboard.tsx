"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  BarChart3,
  FileText,
} from "lucide-react";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();

        if (data.success) {
          setJobs(data.jobs);
        }

        const stored = JSON.parse(
          localStorage.getItem("candidates") || "[]"
        );

        setCandidates(stored);
      } catch (err) {
        console.error(err);
      }
    }

    loadData();
  }, []);

  const avgATS =
    candidates.length > 0
      ? Math.round(
          candidates.reduce(
            (sum: number, c: any) => sum + c.ats.score,
            0
          ) / candidates.length
        )
      : 0;

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-cyan-400">
          Recruiter Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Manage jobs, resumes and hiring.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <Briefcase className="text-cyan-400 mb-4" size={34} />
          <p className="text-gray-400">Jobs</p>
          <h2 className="text-4xl font-bold">{jobs.length}</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <Users className="text-green-400 mb-4" size={34} />
          <p className="text-gray-400">Candidates</p>
          <h2 className="text-4xl font-bold">{candidates.length}</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <BarChart3 className="text-yellow-400 mb-4" size={34} />
          <p className="text-gray-400">Average ATS</p>
          <h2 className="text-4xl font-bold">{avgATS}%</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <FileText className="text-purple-400 mb-4" size={34} />
          <p className="text-gray-400">Status</p>
          <h2 className="text-2xl font-bold text-green-400">
            Active
          </h2>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

          <Link
            href="/recruiter/jobs"
            className="bg-cyan-500 hover:bg-cyan-600 text-black rounded-xl p-4 text-center font-semibold"
          >
            Manage Jobs
          </Link>

          <Link
            href="/recruiter/upload"
            className="bg-slate-800 hover:bg-slate-700 rounded-xl p-4 text-center"
          >
            Upload Resume
          </Link>

          <Link
            href="/recruiter/candidates"
            className="bg-slate-800 hover:bg-slate-700 rounded-xl p-4 text-center"
          >
            Candidates
          </Link>

          <Link
            href="/recruiter/analytics"
            className="bg-slate-800 hover:bg-slate-700 rounded-xl p-4 text-center"
          >
            Analytics
          </Link>

        </div>

      </div>

      {/* Recent Jobs */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          Recent Jobs
        </h2>

        {jobs.length === 0 ? (
          <p className="text-gray-400">
            No jobs uploaded.
          </p>
        ) : (
          jobs.slice(0, 5).map((job) => (
            <div
              key={job.id}
              className="border-b border-slate-800 py-4"
            >
              <h3 className="font-semibold text-lg">
                {job.title}
              </h3>

              <p className="text-gray-400">
                {job.company}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}