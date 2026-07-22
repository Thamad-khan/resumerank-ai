"use client";

import Link from "next/link";
import {
  Upload,
  FileText,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import AvailableJobs from "./AvailableJobs";

export default function StudentDashboard() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-green-400">
          🎓 Student Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome back! Improve your resume and boost your ATS score.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <FileText className="text-cyan-400 mb-4" size={34} />
          <p className="text-gray-400">Resumes Uploaded</p>
          <h2 className="text-4xl font-bold mt-2">1</h2>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <TrendingUp className="text-green-400 mb-4" size={34} />
          <p className="text-gray-400">Best ATS Score</p>
          <h2 className="text-4xl font-bold mt-2">85%</h2>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <Briefcase className="text-yellow-400 mb-4" size={34} />
          <p className="text-gray-400">Jobs Applied</p>
          <h2 className="text-4xl font-bold mt-2">0</h2>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <Upload className="text-purple-400 mb-4" size={34} />
          <p className="text-gray-400">Profile Status</p>
          <h2 className="text-2xl font-bold mt-2 text-green-400">
            Active
          </h2>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <Link
            href="/dashboard/upload"
            className="bg-cyan-500 hover:bg-cyan-600 transition text-black font-semibold rounded-xl p-5 text-center"
          >
            📄 Upload Resume
          </Link>

          <Link
            href="/dashboard/jobs"
            className="bg-slate-800 hover:bg-slate-700 rounded-xl p-5 text-center"
          >
            💼 View Jobs
          </Link>

          <Link
            href="/dashboard/profile"
            className="bg-slate-800 hover:bg-slate-700 rounded-xl p-5 text-center"
          >
            👤 My Profile
          </Link>

        </div>

      </div>

      <AvailableJobs />

      {/* Tips */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-2xl font-bold text-green-400 mb-4">
          💡 Resume Tips
        </h2>

        <ul className="space-y-3 text-gray-300 list-disc ml-5">
          <li>Add measurable achievements.</li>
          <li>Include relevant technical skills.</li>
          <li>Use keywords from the job description.</li>
          <li>Keep your resume to 1–2 pages.</li>
          <li>Upload your latest resume regularly.</li>
        </ul>

      </div>

    </div>
    
  );
}