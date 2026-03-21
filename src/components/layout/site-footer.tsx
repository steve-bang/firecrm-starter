export function SiteFooter() {
  return (
    <footer className="border-t border-white/30 bg-white/60 dark:border-slate-800 dark:bg-slate-950/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-8 dark:text-slate-400">
        <p>Built for teams shipping CRM SaaS products with AI-assisted development.</p>
        <p>Next.js, Firebase, NextAuth, and TailwindCSS.</p>
      </div>
    </footer>
  );
}
