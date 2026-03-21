export type UserRole = "owner" | "admin" | "manager" | "staff";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: UserRole;
  provider?: string;
  workspaceId?: string | null;
  phone?: string;
  jobTitle?: string;
  location?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
};
