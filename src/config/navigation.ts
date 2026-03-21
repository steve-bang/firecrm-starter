export type NavigationItem = {
  href: string;
  label: string;
  description?: string;
};

export const publicNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export const dashboardNavigation: NavigationItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    description: "Metrics, tasks, and recent activity.",
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    description: "Manage account and avatar details.",
  },
  {
    href: "/dashboard/customization",
    label: "Customization",
    description: "Control theme mode and brand color.",
  },
  {
    href: "/dashboard/notification",
    label: "Notifications",
    description: "Review alerts and activity updates.",
  },
  {
    href: "/dashboard/staff",
    label: "Staff",
    description: "Manage team members with mock CRM data.",
  },
];
