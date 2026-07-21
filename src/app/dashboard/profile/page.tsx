"use client";

import { useSession } from "next-auth/react";
import Avatar from "@/components/dashboard/Avatar";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold text-cyan-400">
        My Profile
      </h1>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-8">

        <div className="flex items-center gap-6">

          <Avatar />

          <div>
            <h2 className="text-2xl font-bold">
              {session?.user?.name}
            </h2>

            <p className="text-gray-400">
              {session?.user?.email}
            </p>

            <p className="text-cyan-400 mt-2">
              Role : {session?.user?.role}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}