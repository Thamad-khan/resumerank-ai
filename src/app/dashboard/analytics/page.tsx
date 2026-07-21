import Analytics from "@/components/dashboard/Analytics";
import ATSChart from "@/components/dashboard/ATSChart";
import DownloadReport from "@/components/dashboard/DownloadReport";

const candidates = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    education: "B.Tech CSE",
    experience: "2 Years",
    skills: ["React", "Next.js", "TypeScript"],
    ats: {
      score: 88,
    },
    analysis: {
      strengths: [
        "Strong React knowledge",
        "Good communication",
      ],
      weaknesses: [
        "Limited backend experience",
      ],
      suggestions: [
        "Learn Docker",
        "Improve DSA",
      ],
      recommendation: "Recommended",
    },
  },
  {
    id: 2,
    name: "Alice",
    email: "alice@example.com",
    phone: "9999999999",
    education: "MCA",
    experience: "1 Year",
    skills: ["Python", "Django"],
    ats: {
      score: 76,
    },
    analysis: {
      strengths: ["Python"],
      weaknesses: ["React"],
      suggestions: ["Learn React"],
      recommendation: "Consider",
    },
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-10">
      <Analytics />

      <ATSChart candidates={candidates} />

      <DownloadReport candidate={candidates[0]} />
    </div>
  );
}