"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { brands } from "@/constants";
import { getDateFilterRange, type DateRangeFilterType } from "@/lib/utils";
import type { BikeDetailsType, Brand } from "@/types";
import { Bike, Filter, Search } from "lucide-react";
import { useState } from "react";
import BikeAddAction from "../modal/BikeAddAction";
import BikeItem from "./bike-item";
import { PaginationComponent } from "@/components/common/pagination";

interface BikeProps {
  bikedatas: BikeDetailsType[];
}

export default function BikeList({ bikedatas }: BikeProps) {
  const [brandFilter, setBrandFilter] = useState<string | null>("all");
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateRangeFilter, setDateRangeFilter] =
    useState<DateRangeFilterType>("all");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Adjust as needed

  const currentYear = new Date().getFullYear();
  const lastEightYears = Array.from({ length: 8 }, (_, i) => currentYear - i);

  const filteredData = bikedatas.filter((data) => {
    const brandMatch =
      brandFilter && brandFilter !== "all"
        ? data.bikeBrand === brandFilter
        : true;
    const yearMatch = yearFilter ? data.manufacturingYear === yearFilter : true;

    // Combined search for engine and chassis number
    const searchMatch = searchQuery
      ? data.engineNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.chassisNumber?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const dateFilterMatch = (() => {
      if (dateRangeFilter === "all") return true;

      const range = getDateFilterRange(dateRangeFilter);
      if (!range || !data.createdAt) return true;

      const createdAt = new Date(data.createdAt);
      return createdAt >= range[0] && createdAt <= range[1];
    })();

    return brandMatch && yearMatch && searchMatch && dateFilterMatch;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetFilters = () => {
    setBrandFilter("all");
    setYearFilter(null);
    setSearchQuery("");
    setDateRangeFilter("all");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    brandFilter !== "all" ||
    yearFilter !== null ||
    searchQuery !== "" ||
    dateRangeFilter !== "all";

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Bike className="h-6 w-6" />
              Bike Inventory
            </CardTitle>
            <CardDescription>
              Manage and filter your bike collection
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                  !
                </Badge>
              )}
            </Button>
            <BikeAddAction />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Accordion
          type="single"
          collapsible
          value={showFilters ? "filters" : ""}
        >
          <AccordionItem value="filters" className="border-none">
            <AccordionContent>
              <div className="bg-muted/40 p-4 rounded-lg mb-4">
                <div className="grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Engine/Chassis Number
                    </label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search engine or chassis number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Brand</label>
                    <Select
                      value={brandFilter || "all"}
                      onValueChange={(value) => setBrandFilter(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Brands" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Brands</SelectItem>
                        {brands.map((brand: Brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year</label>
                    <Select
                      value={yearFilter ? yearFilter.toString() : "all"}
                      onValueChange={(value) =>
                        setYearFilter(
                          value !== "all" ? Number.parseInt(value) : null
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        {lastEightYears.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <Select
                      value={dateRangeFilter}
                      onValueChange={(value) =>
                        setDateRangeFilter(value as DateRangeFilterType)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Dates" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Dates</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="thisWeek">This Week</SelectItem>
                        <SelectItem value="lastWeek">Last Week</SelectItem>
                        <SelectItem value="thisMonth">This Month</SelectItem>
                        <SelectItem value="lastMonth">Last Month</SelectItem>
                        <SelectItem value="thisYear">This Year</SelectItem>
                        <SelectItem value="lastYear">Last Year</SelectItem>
                        <SelectItem value="lastSixMonths">
                          Last 6 Months
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    disabled={!hasActiveFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-lg">Results</h2>
            <Badge variant="secondary" className="font-normal">
              {filteredData.length}{" "}
              {filteredData.length === 1 ? "bike" : "bikes"}
            </Badge>
          </div>

          {hasActiveFilters && (
            <Badge variant="outline" className="px-2 py-1">
              Filters Applied
            </Badge>
          )}
        </div>

        {/* Bike Items */}
        <div className="space-y-4">
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((data) => <BikeItem {...data} key={data._id} />)
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                No bikes found matching your filters.
              </p>
              {hasActiveFilters && (
                <Button variant="link" onClick={resetFilters} className="mt-2">
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="mt-6">
            <div className="text-sm text-muted-foreground mb-2 text-center">
              Showing {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredData.length)} of{" "}
              {filteredData.length} bikes
            </div>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
