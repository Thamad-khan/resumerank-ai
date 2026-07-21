import {  Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-cyan-400">
            ResumeRank AI
          </h2>

          <p className="text-gray-400 mt-2">
            AI-powered resume screening platform built with Next.js, Tailwind CSS, and Ollama.
          </p>

          <p className="text-gray-500 text-sm mt-4">
            © 2026 ResumeRank AI. All Rights Reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex gap-6 mt-8 md:mt-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            
          </a>

          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail
              size={24}
              className="text-gray-400 hover:text-cyan-400 transition duration-300"
            />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe
              size={24}
              className="text-gray-400 hover:text-cyan-400 transition duration-300"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}