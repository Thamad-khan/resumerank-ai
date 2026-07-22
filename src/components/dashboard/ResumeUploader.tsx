"use client";

import { useRef, useState, useEffect } from "react";
import { UploadCloud } from "lucide-react";

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  skills: string[];
}

interface ATSData {
  score: number;
  matched: string[];
  missing: string[];
}

interface AnalysisData {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  recommendation: string;
}

export default function ResumeUploader() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [ats, setATS] = useState<ATSData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

  const [jobFileName, setJobFileName] = useState("");
  const [jobSkills, setJobSkills] = useState<string[]>([]);

  useEffect(() => {
  const loadJobData = () => {
    const file = localStorage.getItem("jobFileName");

    const skills: string[] = JSON.parse(
      localStorage.getItem("jobSkills") || "[]"
    );

    setJobFileName(file ?? "");
    setJobSkills(skills);
  };

  loadJobData();
}, []);

  const clearJobDescription = () => {
    if (
      !confirm(
        "Are you sure you want to remove the current Job Description?"
      )
    ) {
      return;
    }

    localStorage.removeItem("jobFileName");
    localStorage.removeItem("jobSkills");

    setJobFileName("");
    setJobSkills([]);

    alert("✅ Job Description removed.");
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

if (!selectedFile) {
  alert("No file selected");
  return;
}

alert("Selected File: " + selectedFile.name);

    setFileName(selectedFile.name);

    const formData = new FormData();

    formData.append("resume", selectedFile);

    const savedJobSkills = JSON.parse(
      localStorage.getItem("jobSkills") || "[]"
    );

    formData.append(
      "jobSkills",
      JSON.stringify(savedJobSkills)
    );

    try {
      alert("Uploading...");

const response = await fetch("/api/upload", {
  method: "POST",
  body: formData,
});

console.log("Status:", response.status);

const data = await response.json();

console.log("Server Response:", data);

if (!response.ok) {
  alert(data.error || "Upload failed");
  return;
}



      console.log(data);

      if (data.success) {
        setResumeText(data.text);
        setResumeData(data.parsed);
        setATS(data.ats);
        setAnalysis(data.analysis);

        const existing = JSON.parse(
  localStorage.getItem("candidates") || "[]"
);

const candidate = {
  ...data.parsed,
  ats: data.ats,
  analysis: data.analysis,
};

const existingIndex = existing.findIndex(
  (c: { email: string }) => c.email === candidate.email
);

if (existingIndex !== -1) {
  // Candidate already exists → update it
  existing[existingIndex] = candidate;
} else {
  // New candidate → add it
  existing.push(candidate);
}

localStorage.setItem(
  "candidates",
  JSON.stringify(existing)
);

        alert("✅ Resume uploaded successfully!");
      } else {
        alert("❌ Upload failed!");
      }
    } catch (error) {
  console.error("Upload Error:", error);

  if (error instanceof Error) {
    alert(error.message);
  } else {
    alert("Unknown error");
  }
}
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-8">

      {jobFileName && (
        <div className="rounded-2xl border border-cyan-500 bg-slate-900 p-4 md:p-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-cyan-400">
                📋 Current Job Description
              </h2>

              <p className="mt-3 font-semibold break-all">
                📄 {jobFileName}
              </p>
            </div>

            <button
              onClick={clearJobDescription}
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
            >
              🗑 Clear JD
            </button>

          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {jobSkills.map((skill) => (
              <span
                key={skill}
                className="bg-cyan-500 text-black px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>
      )}

      <div className="rounded-2xl border-2 border-dashed border-cyan-500 bg-slate-900 p-6 md:p-12 text-center">

        <UploadCloud
          size={48}
          className="mx-auto text-cyan-400 mb-6"
        />

        <h2 className="text-2xl font-bold">
          Upload Resume
        </h2>

        <p className="text-gray-400 mt-2">
          PDF files only
        </p>

        <input
          type="file"
          accept=".pdf"
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          onClick={() => inputRef.current?.click()}
          className="mt-8 w-full md:w-auto bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-semibold text-black transition"
        >
          Choose PDF
        </button>

        {fileName && (
          <p className="mt-5 text-green-400 font-semibold break-all">
            Selected: {fileName}
          </p>
        )}

      </div>

            {/* Candidate Information */}
      {resumeData && (
        <div className="rounded-2xl border border-cyan-500 bg-slate-900 p-4 md:p-6">

          <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-6">
            👤 Candidate Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <p><strong>Name:</strong> {resumeData.name}</p>
              <p className="mt-2 break-all">
                <strong>Email:</strong> {resumeData.email}
              </p>
              <p className="mt-2">
                <strong>Phone:</strong> {resumeData.phone}
              </p>
            </div>

            <div>
              <p>
                <strong>Education:</strong> {resumeData.education}
              </p>

              <p className="mt-2">
                <strong>Experience:</strong> {resumeData.experience}
              </p>
            </div>

          </div>

          <div className="mt-6">

            <h3 className="font-bold text-cyan-400 mb-3">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="bg-cyan-500 text-black px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ATS Score */}
      {ats && (
        <div className="rounded-2xl border border-green-500 bg-slate-900 p-4 md:p-6">

          <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-6">
            ATS Score
          </h2>

          <div className="w-full h-5 rounded-full bg-slate-700 overflow-hidden">
            <div
              className="h-5 bg-green-500 transition-all duration-500"
              style={{ width: `${ats.score}%` }}
            />
          </div>

          <p className="text-2xl md:text-4xl font-bold text-green-400 mt-5">
            {ats.score}%
          </p>

          <div className="mt-8">

            <h3 className="font-bold text-green-400 mb-3">
              ✅ Matching Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {ats.matched.length ? (
                ats.matched.map((skill: string) => (
                  <span
                    key={skill}
                    className="bg-green-500 text-black px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">
                  No matching skills.
                </p>
              )}
            </div>

          </div>

          <div className="mt-8">

            <h3 className="font-bold text-red-400 mb-3">
              ❌ Missing Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {ats.missing.length ? (
                ats.missing.map((skill: string) => (
                  <span
                    key={skill}
                    className="bg-red-500 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">
                  No missing skills 🎉
                </p>
              )}
            </div>

          </div>

        </div>
      )}

      {/* AI Analysis */}
      {analysis && (
        <div className="rounded-2xl border border-blue-500 bg-slate-900 p-4 md:p-6">

          <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-8">
            🤖 AI Resume Analysis
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>

              <h3 className="font-bold text-green-400 mb-3">
                ✅ Strengths
              </h3>

              <ul className="list-disc ml-5 space-y-2">
                {analysis.strengths.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

            </div>

            <div>

              <h3 className="font-bold text-red-400 mb-3">
                ❌ Weaknesses
              </h3>

              <ul className="list-disc ml-5 space-y-2">
                {analysis.weaknesses.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

            </div>

            <div>

              <h3 className="font-bold text-yellow-400 mb-3">
                💡 Suggestions
              </h3>

              <ul className="list-disc ml-5 space-y-2">
                {analysis.suggestions.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

            </div>

          </div>

          <div className="mt-8 rounded-xl bg-slate-800 border border-slate-700 p-5">

            <h3 className="font-bold text-cyan-400 mb-2">
              🏆 Recommendation
            </h3>

            <p className="text-lg">
              {analysis.recommendation}
            </p>

          </div>

        </div>
      )}

      {/* Resume Text */}
      {resumeText && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4 md:p-6">

          <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-5">
            📄 Extracted Resume Text
          </h2>

          <pre className="whitespace-pre-wrap text-sm overflow-auto max-h-[500px] break-words">
            {resumeText}
          </pre>

        </div>
      )}

    </div>
  );
}