import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Card, CardHeader } from "@/components/ui/card";

const sections = [
  {
    title: "Why this starter exists",
    description:
      "Most CRM projects spend too much time rebuilding auth, dashboard shells, and settings flows. FireCRM Starter turns those repeated tasks into a reusable foundation.",
  },
  {
    title: "How it scales",
    description:
      "The architecture separates modules, services, hooks, and UI primitives so product teams can grow feature depth without tangling the codebase.",
  },
  {
    title: "Why AI agents fit well here",
    description:
      "The repository is documented for Codex and similar coding agents, making it easier to extend safely with predictable file ownership and conventions.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-brand)]">
            About the template
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
            A modern SaaS CRM foundation shaped for speed and maintainability.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            FireCRM Starter gives teams a clean route structure, auth system, dashboard UI,
            mock data modules, and Firebase setup points so they can move directly into
            customer-specific CRM features.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {sections.map((section) => (
            <Card key={section.title}>
              <CardHeader title={section.title} description={section.description} />
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
