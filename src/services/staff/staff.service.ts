import type { StaffMember } from "@/types/staff";

const staffMembers: StaffMember[] = [
  {
    id: "staff-1",
    fullName: "Avery Martinez",
    email: "avery@firecrm.dev",
    jobTitle: "Sales Lead",
    department: "Revenue",
    status: "active",
    phone: "+1 (415) 555-1001",
    joinedAt: "2024-08-10",
    workspaceId: "demo-workspace",
  },
  {
    id: "staff-2",
    fullName: "Jordan Kim",
    email: "jordan@firecrm.dev",
    jobTitle: "Customer Success Manager",
    department: "Support",
    status: "active",
    phone: "+1 (415) 555-1012",
    joinedAt: "2024-11-02",
    workspaceId: "demo-workspace",
  },
  {
    id: "staff-3",
    fullName: "Taylor Brown",
    email: "taylor@firecrm.dev",
    jobTitle: "Operations Analyst",
    department: "Operations",
    status: "on_leave",
    phone: "+1 (415) 555-1048",
    joinedAt: "2025-01-14",
    workspaceId: "demo-workspace",
  },
  {
    id: "staff-4",
    fullName: "Casey Johnson",
    email: "casey@firecrm.dev",
    jobTitle: "Marketing Strategist",
    department: "Marketing",
    status: "inactive",
    phone: "+1 (415) 555-1100",
    joinedAt: "2024-06-22",
    workspaceId: "demo-workspace",
  },
  {
    id: "staff-5",
    fullName: "Riley Patel",
    email: "riley@firecrm.dev",
    jobTitle: "Product Specialist",
    department: "Product",
    status: "active",
    phone: "+1 (415) 555-1134",
    joinedAt: "2025-02-01",
    workspaceId: "demo-workspace",
  },
  {
    id: "staff-6",
    fullName: "Sam Chen",
    email: "sam@firecrm.dev",
    jobTitle: "Implementation Manager",
    department: "Onboarding",
    status: "active",
    phone: "+1 (415) 555-1199",
    joinedAt: "2024-09-19",
    workspaceId: "demo-workspace",
  },
];

export function getStaffMembers() {
  return staffMembers;
}
