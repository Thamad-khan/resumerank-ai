"use client";

import { useState } from "react";

import StudentSidebar from "@/components/dashboard/StudentSidebar";
import StudentNavbar from "@/components/dashboard/StudentNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <StudentSidebar open={open} setOpen={setOpen} />

      {/* Dark overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <StudentNavbar setOpen={setOpen} />

        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}