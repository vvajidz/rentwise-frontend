import DashboardLayout from "@/components/ownerDashboard/layout";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}