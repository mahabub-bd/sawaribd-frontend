"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMemo } from "react";
import { useMediaQuery } from "@/hooks/use-mobile";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

export function PaginationComponent({
  currentPage,
  totalPages,
  baseUrl = "?page=",
}: PaginationComponentProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const visiblePages = useMemo(() => {
    const siblingsCount = isMobile ? 1 : 2;

    const pages = new Set<number>();

    for (
      let i = Math.max(1, currentPage - siblingsCount);
      i <= Math.min(totalPages, currentPage + siblingsCount);
      i++
    ) {
      pages.add(i);
    }

    pages.add(1);
    pages.add(totalPages);

    return Array.from(pages).sort((a, b) => a - b);
  }, [currentPage, totalPages, isMobile]);

  return (
    <Pagination>
      <PaginationContent className="flex-wrap">
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={`${baseUrl}${currentPage - 1}`}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        {/* Page Numbers with Ellipsis */}
        {visiblePages.map((page, index) => {
          // Add ellipsis if there's a gap between pages
          const previousPage = visiblePages[index - 1];
          const needsEllipsisBefore = previousPage && page - previousPage > 1;

          return (
            <div key={page} className="flex items-center">
              {needsEllipsisBefore && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href={`${baseUrl}${page}`}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            </div>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={`${baseUrl}${currentPage + 1}`}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
