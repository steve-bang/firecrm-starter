import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  page: number;
  pageCount: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  emptyState: ReactNode;
};

export function DataTable<T extends { id: string }>({
  title,
  description,
  columns,
  rows,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  page,
  pageCount,
  onPreviousPage,
  onNextPage,
  canGoPrevious,
  canGoNext,
  emptyState,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 px-6 py-5 dark:border-slate-800">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
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
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50/80 dark:bg-slate-900/70">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800">
            {rows.length ? (
              rows.map((row) => (
                <tr key={row.id} className="align-top">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 text-sm text-slate-700 dark:text-slate-200 ${column.className ?? ""}`}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-10">
                  {emptyState}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200/80 px-6 py-4 text-sm dark:border-slate-800">
        <span className="text-slate-500 dark:text-slate-400">
          Page {page} of {pageCount}
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
