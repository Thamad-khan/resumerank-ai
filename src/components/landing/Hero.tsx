"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center text-center min-h-[85vh] px-6"
    >
      <p className="text-cyan-400 font-semibold">
        🚀 AI Powered Hiring Platform
      </p>

      <h1 className="text-6xl font-extrabold mt-5 leading-tight">
        Hire Smarter
        <br />
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          with AI
        </span>
      </h1>

      <p className="max-w-2xl mt-8 text-gray-400 text-xl">
        Upload resumes, compare candidates, generate ATS scores and shortlist
        the best applicants using Local AI powered by Ollama.
      </p>

      <div className="flex gap-6 mt-10">
        <Button text="Get Started" />

        <button className="border border-cyan-500 px-6 py-3 rounded-xl hover:bg-cyan-500 hover:text-black transition">
          Live Demo
        </button>
      </div>
    </motion.section>
  );
}