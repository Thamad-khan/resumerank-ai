import RecruiterShell from "@/components/layout/RecruiterShell";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecruiterShell>{children}</RecruiterShell>;
}