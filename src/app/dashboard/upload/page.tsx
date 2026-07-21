import ResumeUploader from "@/components/dashboard/ResumeUploader";
import PDFPreview from "@/components/dashboard/PDFPreview";

export default function UploadPage() {
  return (
    <div className="space-y-10">
      <ResumeUploader />
      <PDFPreview />
    </div>
  );
}