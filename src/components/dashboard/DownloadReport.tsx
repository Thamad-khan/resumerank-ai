"use client";

import { jsPDF } from "jspdf";

interface Props {
  candidate: any;
}

export default function DownloadReport({ candidate }: Props) {
  const generatePDF = () => {
    const doc = new jsPDF();

    let y = 20;

    // Title
    doc.setFontSize(22);
    doc.text("ResumeRank AI", 20, y);

    y += 12;

    doc.setFontSize(16);
    doc.text("Candidate Report", 20, y);

    y += 15;

    // Candidate Info
    doc.setFontSize(14);
    doc.text("Candidate Information", 20, y);

    y += 10;

    doc.setFontSize(12);

    doc.text(`Name: ${candidate.name}`, 20, y);
    y += 8;

    doc.text(`Email: ${candidate.email}`, 20, y);
    y += 8;

    doc.text(`Phone: ${candidate.phone}`, 20, y);
    y += 8;

    doc.text(`Education: ${candidate.education}`, 20, y);
    y += 8;

    doc.text(`Experience: ${candidate.experience}`, 20, y);

    y += 15;

    // ATS
    doc.setFontSize(14);
    doc.text("ATS Score", 20, y);

    y += 10;

    doc.setFontSize(12);
    doc.text(`${candidate.ats.score}%`, 20, y);

    y += 15;

    // Skills
    doc.setFontSize(14);
    doc.text("Skills", 20, y);

    y += 10;

    doc.setFontSize(12);

    candidate.skills.forEach((skill: string) => {
      doc.text(`• ${skill}`, 25, y);
      y += 7;
    });

    // AI Analysis
    if (candidate.analysis) {
      y += 10;

      doc.setFontSize(14);
      doc.text("AI Analysis", 20, y);

      y += 10;

      doc.setFontSize(12);

      doc.text("Strengths:", 20, y);
      y += 7;

      candidate.analysis.strengths?.forEach((item: string) => {
        doc.text(`• ${item}`, 25, y);
        y += 7;
      });

      y += 5;

      doc.text("Weaknesses:", 20, y);
      y += 7;

      candidate.analysis.weaknesses?.forEach((item: string) => {
        doc.text(`• ${item}`, 25, y);
        y += 7;
      });

      y += 5;

      doc.text("Suggestions:", 20, y);
      y += 7;

      candidate.analysis.suggestions?.forEach((item: string) => {
        doc.text(`• ${item}`, 25, y);
        y += 7;
      });

      y += 10;

      doc.text(
        `Recommendation: ${candidate.analysis.recommendation}`,
        20,
        y
      );
    }

    doc.save(`${candidate.name}-ResumeRankAI.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="w-full md:w-auto mt-5 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-4 py-2 rounded-lg transition"
    >
      📄 Download Report
    </button>
  );
}