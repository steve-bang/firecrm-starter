import type { Metadata } from "next";

import { StaffManagement } from "@/modules/staff/components/staff-management";

export const metadata: Metadata = {
  title: "Staff Management",
  description:
    "Manage team members, roles, and status with the reusable staff directory pattern in FireCRM Starter.",
};

export default function DashboardStaffPage() {
  return <StaffManagement />;
}
