import JobUploader from "@/components/dashboard/JobUploader";
import JobList from "@/components/dashboard/JobList";

export default function JobsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-cyan-400">
          Jobs
        </h1>

        <p className="text-gray-400 mt-2">
          Upload a job description and manage all your jobs.
        </p>
      </div>

      <JobUploader />

      <JobList />
    </div>
  );
}