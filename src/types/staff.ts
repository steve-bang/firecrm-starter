export type StaffStatus = "active" | "inactive" | "on_leave";

export type StaffMember = {
  id: string;
  fullName: string;
  email: string;
  jobTitle: string;
  department: string;
  status: StaffStatus;
  phone: string;
  joinedAt: string;
  workspaceId: string;
};
