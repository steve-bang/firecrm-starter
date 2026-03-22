import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  action,
  actions,
  className,
}: PageHeaderProps) {
  const actionContent = actions ?? action;

  return (
    <div
      className={cn(
        "page-header",
        className,
      )}
    >
      <div className="page-header__content">
        <h1 className="page-title text-slate-950 dark:text-white">{title}</h1>
        {description ? <p className="page-description mt-1.5">{description}</p> : null}
      </div>
      {actionContent ? (
        <div className="page-header__actions">
          {/* Keep page actions in a dedicated region so screens feel aligned even as content changes. */}
          {actionContent}
        </div>
      ) : null}
    </div>
  );
}
