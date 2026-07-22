"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  skills: string[];
}

export default function AvailableJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function loadJobs() {
      const res = await fetch("/api/jobs/public");
      const data = await res.json();

      if (data.success) {
        setJobs(data.jobs);
      }
    }

    loadJobs();
  }, []);

  return (
    <div className="space-y-6">

      <h2 className="text-3xl font-bold text-cyan-400">
        Available Jobs
      </h2>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="bg-slate-900 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-2xl font-bold">
              {job.title}
            </h3>

            <p className="text-gray-400">
              {job.company}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-cyan-500 text-black px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <Link
              href={`/dashboard/upload?jobId=${job.id}`}
              className="inline-block mt-6 bg-cyan-500 text-black px-5 py-3 rounded-lg font-semibold"
            >
              Apply
            </Link>
          </div>
        ))
      )}
    </div>
  );
}