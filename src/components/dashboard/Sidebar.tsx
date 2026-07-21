"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  Briefcase,
  Users,
  BarChart3,
  User,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/recruiter/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Upload Resume",
    href: "/recruiter/upload",
    icon: Upload,
  },
  {
    title: "Job Description",
    href: "/recruiter/jobs",
    icon: Briefcase,
  },
  {
    title: "Candidates",
    href: "/recruiter/candidates",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/recruiter/analytics",
    icon: BarChart3,
  },
  {
    title: "Profile",
    href: "/recruiter/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/recruiter/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Dark Background */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50
        w-64 h-screen
        bg-slate-900 border-r border-slate-800
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex
        flex flex-col`}
      >
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-cyan-400">
            ResumeRank AI
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  pathname === item.href
                    ? "bg-cyan-500 text-white"
                    : "text-gray-300 hover:bg-slate-800"
                }`}
              >
                <Icon size={20} />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}