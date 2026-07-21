"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function JobList() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    async function loadJobs() {
      const res = await fetch("/api/jobs");
      const data = await res.json();

      if (data.success) {
        setJobs(data.jobs);
      }
    }

    loadJobs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            My Jobs
          </h2>

          <p className="text-gray-400 mt-1">
            Manage all your uploaded job descriptions.
          </p>
        </div>

        <Link
          href="/dashboard/upload-job"
          className="w-full md:w-auto text-center bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-3 rounded-xl transition"
        >
          ➕ Upload Job Description
        </Link>

      </div>

      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-10 text-center">

          <h2 className="text-xl md:text-2xl font-bold">
            No Jobs Uploaded
          </h2>

          <p className="text-gray-400 mt-3">
            Upload your first Job Description.
          </p>

        </div>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-5 md:p-6 hover:border-cyan-500 transition"
          >

            <h2 className="text-xl md:text-2xl font-bold text-cyan-400 break-words">
              {job.title}
            </h2>

            <p className="text-gray-400 mt-2">
              {job.company}
            </p>

            <div className="mt-5">

              <h3 className="font-bold text-cyan-400 mb-3">
                Required Skills
              </h3>

              <div className="flex flex-wrap gap-2">

                {job.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="bg-cyan-500 text-black px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>

                        <p className="text-gray-500 mt-5 text-sm">
              Created:{" "}
              {new Date(job.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">

              <Link
                href={`/dashboard/upload?jobId=${job.id}`}
                className="w-full sm:w-auto text-center bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-5 py-3 rounded-xl transition"
              >
                📄 Upload Resume
              </Link>

              <button
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-xl transition"
                onClick={() => alert("Delete Job feature coming soon")}
              >
                🗑 Delete Job
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
}