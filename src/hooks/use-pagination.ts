"use client";

import { useMemo, useState } from "react";

export function usePagination<T>(items: T[], pageSize = 5) {
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, pageCount);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [currentPage, items, pageSize]);

  return {
    page: currentPage,
    pageCount,
    pageSize,
    currentItems,
    setPage,
    canGoPrevious: currentPage > 1,
    canGoNext: currentPage < pageCount,
  };
}
