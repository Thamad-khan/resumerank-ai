import { Brain } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Brain className="text-cyan-400" size={32} />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ResumeRank AI
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-gray-300 hover:text-cyan-400 transition duration-300"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="text-gray-300 hover:text-cyan-400 transition duration-300"
          >
            Pricing
          </a>

          <a
            href="#about"
            className="text-gray-300 hover:text-cyan-400 transition duration-300"
          >
            About
          </a>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-gray-300 hover:text-cyan-400 transition duration-300">
            Login
          </button>

          <Button text="Get Started" />
        </div>

      </div>
    </nav>
  );
}