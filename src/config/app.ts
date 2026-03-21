export const appConfig = {
  name: "FireCRM Starter",
  tagline: "Launch a modern CRM SaaS faster with a production-shaped foundation.",
  description:
    "A SaaS CRM starter template powered by Next.js, TypeScript, TailwindCSS, Firebase, and NextAuth.",
  company: "FireCRM",
  supportEmail: "support@firecrmstarter.dev",
  demoCredentials: {
    email: "demo@firecrm.dev",
    password: "FireCRM123!",
  },
  dashboardStats: [
    {
      title: "Open pipeline",
      value: "$84.2K",
      change: "+12.4%",
      tone: "positive" as const,
    },
    {
      title: "Active contacts",
      value: "1,248",
      change: "+8.1%",
      tone: "positive" as const,
    },
    {
      title: "Tasks due today",
      value: "17",
      change: "-3 overdue",
      tone: "warning" as const,
    },
    {
      title: "Team utilization",
      value: "91%",
      change: "Stable",
      tone: "neutral" as const,
    },
  ],
};
