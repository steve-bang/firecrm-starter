import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "page-header gap-3 md:flex-row md:items-start md:justify-between",
        className,
      )}
    >
      <div>
        <h1 className="page-title text-slate-950 dark:text-white">{title}</h1>
        {description ? <p className="page-description mt-1.5">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
