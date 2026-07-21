import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import RecruiterDashboard from "@/components/dashboard/RecruiterDashboard";

export default async function RecruiterDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if ((session.user as any).role !== "RECRUITER") {
    redirect("/dashboard");
  }

  return <RecruiterDashboard />;
}