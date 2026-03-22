import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

export function Modal({
  open,
  title,
  description,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="surface-floating w-full max-w-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-sm text-muted">
              {description}
            </p>
          ) : null}
        </div>
        <div>{children}</div>
        <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
