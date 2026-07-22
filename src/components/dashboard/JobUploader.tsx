"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

interface JobData {
  skills: string[];
}

export default function JobUploader() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState("");
  const [jobData, setJobData] = useState<JobData | null>(null);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();
    formData.append("job", file);

    try {
      const response = await fetch("/api/upload/job", {
        method: "POST",
        body: formData,
      });

      const data: {
        success: boolean;
        parsed: JobData;
      } = await response.json();

      console.log(data);

      if (data.success) {
        setJobData(data.parsed);

        // Save Job Description file name
        localStorage.setItem("jobFileName", file.name);

        // Save Job Skills
        localStorage.setItem(
          "jobSkills",
          JSON.stringify(data.parsed.skills)
        );

        alert("✅ Job Description Saved");
      } else {
        alert("❌ Failed to upload Job Description");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="border-2 border-dashed border-cyan-500 rounded-2xl p-12 text-center">

      <UploadCloud
        size={60}
        className="mx-auto text-cyan-400 mb-6"
      />

      <h2 className="text-2xl font-bold">
        Upload Job Description
      </h2>

      <input
        type="file"
        accept=".pdf"
        className="hidden"
        ref={inputRef}
        onChange={handleChange}
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="mt-8 bg-cyan-500 px-6 py-3 rounded-xl"
      >
        Choose PDF
      </button>

      {fileName && (
        <p className="mt-6 text-green-400">
          Selected: {fileName}
        </p>
      )}

      {jobData && (
        <div className="mt-8 text-left border border-slate-700 rounded-xl p-6">

          <h2 className="text-xl font-bold text-cyan-400 mb-4">
            Required Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {jobData.skills.map((skill: string) => (
              <span
                key={skill}
                className="bg-cyan-500 text-black px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}