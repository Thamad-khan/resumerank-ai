"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface Props {
  file?: File | null;
}

export default function PDFPreview({ file = null }: Props) {
  const [numPages, setNumPages] = useState(0);

  if (!file) {
    return (
      <div className="border rounded-xl p-10 text-center text-gray-400">
        No PDF Selected
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-700 p-4">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <Page pageNumber={1} width={500} />
      </Document>

      <p className="mt-4 text-center text-gray-400">
        Total Pages: {numPages}
      </p>
    </div>
  );
}