"use client";

import { useSession } from "next-auth/react";

export default function Avatar() {
  const { data: session } = useSession();

  const image = session?.user?.image;
  const name = session?.user?.name;

  if (image) {
    return (
      <img
        src={image}
        alt="Profile"
        className="w-10 h-10 rounded-full border-2 border-cyan-500"
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold">
      {name?.charAt(0).toUpperCase() || "U"}
    </div>
  );
}