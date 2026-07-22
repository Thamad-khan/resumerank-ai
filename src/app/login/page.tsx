"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function recruiterLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/recruiter/dashboard");
    } else {
      alert("Invalid email or password.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-sm rounded-2xl border border-cyan-500 bg-slate-900 p-6 shadow-2xl">

        {/* Logo */}
        <h1 className="text-4xl font-bold text-center text-cyan-400">
          ResumeRank AI
        </h1>

        <p className="mt-2 mb-6 text-center text-gray-400">
          Sign in to continue
        </p>

        {/* Google Login */}
        {/* Google Login */}
        <button
          onClick={async () => {
            await signIn("google", {
              callbackUrl: "/api/auth/callback-handler",
            });
          }}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 font-semibold text-gray-300 transition hover:bg-slate-600"
        >
          Sign in with Google
        </button>

  


        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-slate-700"></div>

          <span className="mx-4 text-gray-500">
            OR
          </span>

          <div className="flex-1 border-t border-slate-700"></div>
        </div>

        {/* Recruiter Login */}
        <form onSubmit={recruiterLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Recruiter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 outline-none focus:border-cyan-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 outline-none focus:border-cyan-500"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-500 py-2.5 font-bold text-black transition hover:bg-cyan-600"
          >
            Recruiter Sign In
          </button>

        </form>

        {/* Register */}
        <div className="mt-6 border-t border-slate-700 pt-5">

          <p className="mb-3 text-center text-sm text-gray-400">
            Don&#39;t have a recruiter account?
          </p>

          <Link
            href="/register"
            className="block w-full rounded-xl border border-cyan-500 py-2.5 text-center font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
          >
            Create Recruiter Account
          </Link>

        </div>

        {/* Back */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-cyan-400"
          >
            ← Back to Home
          </Link>
        </div>

      </div>

    </div>
  );
}