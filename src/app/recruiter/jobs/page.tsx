import JobUploader from "@/components/dashboard/JobUploader";
import JobList from "@/components/dashboard/JobList";

export default function RecruiterJobsPage() {
  return (
    <div className="space-y-10">
      <JobUploader />
      <JobList />
    </div>
  );
}