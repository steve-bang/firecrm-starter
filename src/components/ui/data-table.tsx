import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type DataTableColumn<T> = {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  className?: string;
};

type DataTableProps<T extends { id: string }> = {
  title: string;
  description?: string;
  columns: Array<DataTableColumn<T>>;
  rows: T[];
  toolbar?: ReactNode;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  page: number;
  pageCount: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  footerLabel?: ReactNode;
  emptyState: ReactNode;
};

export function DataTable<T extends { id: string }>({
  title,
  description,
  columns,
  rows,
  toolbar,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  page,
  pageCount,
  onPreviousPage,
  onNextPage,
  canGoPrevious,
  canGoNext,
  footerLabel,
  emptyState,
}: DataTableProps<T>) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-[var(--border-color)] px-5 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm text-muted">
                {description}
              </p>
            ) : null}
          </div>
          {onSearchChange ? (
            <div className="w-full max-w-sm">
              <Input
                value={searchValue}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={searchPlaceholder}
              />
            </div>
          ) : null}
        </div>
        {toolbar ? <div className="flex flex-wrap items-center gap-3">{toolbar}</div> : null}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--border-color)]">
          <thead className="bg-[var(--card-background-muted)]/80">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-subtle",
                    column.className,
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {rows.length ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="align-top transition-colors hover:bg-white/55 dark:hover:bg-slate-950/55"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "px-5 py-3.5 text-sm text-slate-700 dark:text-slate-200",
                        column.className,
                      )}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-5 py-8">
                  {emptyState}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2.5 border-t border-[var(--border-color)] px-5 py-3.5 text-sm md:flex-row md:items-center md:justify-between">
        <span className="text-muted">
          {footerLabel ?? `Page ${page} of ${pageCount}`}
        </span>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onPreviousPage} disabled={!canGoPrevious}>
            Previous
          </Button>
          <Button variant="secondary" onClick={onNextPage} disabled={!canGoNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
