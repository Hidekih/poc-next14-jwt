import { guard } from "@src/actions/server-guard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await guard(["Developer"]);

  return children;
}