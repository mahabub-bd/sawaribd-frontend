"use client";

import { useState } from "react";
import { Search, Filter, Bike } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { brands } from "@/constants";
import type { BikeDetailsType, Brand } from "@/types";
import BikeAddAction from "../modal/BikeAddAction";
import BikeItem from "./bike-item";

interface BikeProps {
  bikedatas: BikeDetailsType[];
}

export default function BikeList({ bikedatas }: BikeProps) {
  const [brandFilter, setBrandFilter] = useState<string | null>("all");
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [engineNumber, setEngineNumber] = useState<string>("");
  const [chassisNumber, setChassisNumber] = useState<string>("");
  const [dateRangeFilter, setDateRangeFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const currentYear = new Date().getFullYear();
  const lastEightYears = Array.from({ length: 8 }, (_, i) => currentYear - i);

  const getDateFilterRange = (filter: string) => {
    const today = new Date();
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay() + 1
    ); // Monday
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const startOfLastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
    const endOfLastYear = new Date(today.getFullYear() - 1, 11, 31);

    const startOfLastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay() - 6
    );
    const endOfLastWeek = new Date(
      startOfLastWeek.getFullYear(),
      startOfLastWeek.getMonth(),
      startOfLastWeek.getDate() + 6
    );

    const sixMonthsAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 6,
      today.getDate()
    );

    switch (filter) {
      case "today":
        return [new Date(), new Date()];
      case "thisWeek":
        return [startOfWeek, new Date()];
      case "lastWeek":
        return [startOfLastWeek, endOfLastWeek];
      case "thisMonth":
        return [startOfMonth, new Date()];
      case "lastMonth":
        return [startOfLastMonth, endOfLastMonth];
      case "thisYear":
        return [startOfYear, new Date()];
      case "lastYear":
        return [startOfLastYear, endOfLastYear];
      case "lastSixMonths":
        return [sixMonthsAgo, new Date()];
      default:
        return null;
    }
  };

  const filteredData = bikedatas.filter((data) => {
    const brandMatch =
      brandFilter && brandFilter !== "all"
        ? data.bikeBrand === brandFilter
        : true;
    const yearMatch = yearFilter ? data.manufacturingYear === yearFilter : true;
    const engineMatch = engineNumber
      ? data.engineNumber?.toLowerCase().includes(engineNumber.toLowerCase())
      : true;
    const chassisMatch = chassisNumber
      ? data.chassisNumber?.toLowerCase().includes(chassisNumber.toLowerCase())
      : true;

    const dateFilterMatch = (() => {
      if (dateRangeFilter === "all") return true;

      const range = getDateFilterRange(dateRangeFilter);
      if (!range || !data.createdAt) return true;

      const createdAt = new Date(data.createdAt);
      return createdAt >= range[0] && createdAt <= range[1];
    })();

    return (
      brandMatch && yearMatch && engineMatch && chassisMatch && dateFilterMatch
    );
  });

  const resetFilters = () => {
    setBrandFilter("all");
    setYearFilter(null);
    setEngineNumber("");
    setChassisNumber("");
    setDateRangeFilter("all");
  };

  const hasActiveFilters =
    brandFilter !== "all" ||
    yearFilter !== null ||
    engineNumber !== "" ||
    chassisNumber !== "" ||
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
                <div className="grid md:grid-cols-5 grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Engine Number</label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search..."
                        value={engineNumber}
                        onChange={(e) => setEngineNumber(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Chassis Number
                    </label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search..."
                        value={chassisNumber}
                        onChange={(e) => setChassisNumber(e.target.value)}
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
                      onValueChange={(value) => setDateRangeFilter(value)}
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
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((data) => <BikeItem {...data} key={data._id} />)
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
      </CardContent>
    </Card>
  );
}
