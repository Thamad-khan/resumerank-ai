import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-cyan-400">
          ResumeRank AI
        </h1>

        <p className="text-gray-400 text-lg">
          AI Powered Resume Screening System
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-cyan-500 rounded-lg hover:bg-cyan-600"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-6 py-3 bg-slate-700 rounded-lg hover:bg-slate-600"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}