import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RecruiterProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if ((session.user as any).role !== "RECRUITER") {
    redirect("/dashboard");
  }

  const user = session.user as any;

  return (
    <div className="max-w-6xl mx-auto">

      <h1 className="text-5xl font-bold text-cyan-400 mb-10">
        My Profile
      </h1>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-10">

        <div className="flex items-center gap-6">

          <div className="w-20 h-20 rounded-full border-2 border-cyan-400 bg-slate-800 flex items-center justify-center text-3xl font-bold text-white">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>

            <h2 className="text-4xl font-bold text-white">
              {user.name}
            </h2>

            <p className="text-gray-400 text-xl mt-1">
              {user.email}
            </p>

            <p className="text-cyan-400 mt-3 text-xl">
              Role : <span className="font-semibold">RECRUITER</span>
            </p>

            {user.company && (
              <p className="text-green-400 mt-2 text-lg">
                Company : {user.company}
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}