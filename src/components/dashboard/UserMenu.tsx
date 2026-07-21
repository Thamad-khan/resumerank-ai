"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar";

export default function UserMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const role = (session?.user as any)?.role;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full"
      >
        <Avatar />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 rounded-xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden z-50">

          {/* User Info */}
          <div className="p-5 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <Avatar />

              <div>
                <p className="font-semibold text-white">
                  {session?.user?.name}
                </p>

                <p className="text-sm text-gray-400">
                  {session?.user?.email}
                </p>

                <p className="text-xs text-green-400 mt-1">
                  {role}
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard */}
          <button
            onClick={() =>
              router.push(
                role === "RECRUITER"
                  ? "/recruiter/dashboard"
                  : "/dashboard"
              )
            }
            className="w-full text-left px-5 py-3 hover:bg-slate-800"
          >
            📊 Dashboard
          </button>

          {/* Profile */}
          <button
            onClick={() =>
              router.push(
                role === "RECRUITER"
                  ? "/recruiter/profile"
                  : "/dashboard/profile"
              )
            }
            className="w-full text-left px-5 py-3 hover:bg-slate-800"
          >
            👤 Profile
          </button>

          {/* Recruiter Only */}
          {role === "RECRUITER" && (
            <>
              <button
                onClick={() => router.push("/recruiter/settings")}
                className="w-full text-left px-5 py-3 hover:bg-slate-800"
              >
                🏢 Company Settings
              </button>

              <button
                onClick={() => router.push("/recruiter/jobs")}
                className="w-full text-left px-5 py-3 hover:bg-slate-800"
              >
                💼 Manage Jobs
              </button>
            </>
          )}

          <hr className="border-slate-700" />

          <button
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
            className="w-full text-left px-5 py-3 text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
}