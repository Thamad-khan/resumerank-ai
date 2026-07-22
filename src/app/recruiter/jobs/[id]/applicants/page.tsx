"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
interface Application {
  id: string;
  atsScore: number;
  status: string;
  recommendation: string;
  candidate: {
    name: string;
    email: string;
    phone: string;
  };
}
export default function ApplicantsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch(`/api/jobs/${id}/applications`);
        const data = await res.json();

        if (data.success) {
          setApplications(data.applications);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading applicants...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <button
        onClick={() => router.push("/recruiter/dashboard")}
        className="mb-6 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-6">
        Applicants
      </h1>

      {applications.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="rounded-xl border border-slate-700 bg-slate-900 p-6"
            >
              <h2 className="text-2xl font-bold">
                {app.candidate.name}
              </h2>

              <p className="mt-2">{app.candidate.email}</p>

              <p>{app.candidate.phone}</p>

              <p className="mt-4">
                <strong>ATS Score:</strong> {app.atsScore}%
              </p>

              <p>
                <strong>Status:</strong> {app.status}
              </p>

              <p className="mt-2">
                <strong>Recommendation:</strong>{" "}
                {app.recommendation}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}