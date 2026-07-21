"use client";

import { Menu, Bell } from "lucide-react";
import UserMenu from "./UserMenu";

interface NavbarProps {
  setOpen?: (value: boolean) => void;
}

export default function Navbar({ setOpen }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 h-16 md:h-20 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 md:px-8">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen?.(true)}
          className="lg:hidden"
        >
          <Menu size={26} />
        </button>

        <div>
          <h1 className="text-lg md:text-2xl font-bold text-cyan-400">
            ResumeRank AI
          </h1>

          <p className="hidden md:block text-xs text-gray-400">
            AI Powered Resume Screening
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-6">

        <button className="relative p-2 rounded-lg hover:bg-slate-800 transition">
          <Bell size={22} />

          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <UserMenu />

      </div>

    </header>
  );
}