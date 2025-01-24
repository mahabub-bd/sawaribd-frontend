"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { brands } from "@/constants";
import { BikeDetailsType, Brand } from "@/types";
import { useState } from "react";
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

    const sixMonthsAgo = new Date(today.setMonth(today.getMonth() - 6));

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

  return (
    <div className="md:p-8 p-4 bg-white shadow-2xl rounded-lg">
      {/* Filter Controls */}
      <div className="flex justify-end my-4">
        <BikeAddAction />
      </div>
      <div className="grid md:grid-cols-5 grid-cols-2 gap-2 md:py-2 py-2">
        {/* Engine Number Search */}
        <Input
          type="text"
          placeholder="Search by Engine Number"
          value={engineNumber}
          onChange={(e) => setEngineNumber(e.target.value)}
        />

        {/* Chassis Number Search */}
        <Input
          type="text"
          placeholder="Search by Chassis Number"
          value={chassisNumber}
          onChange={(e) => setChassisNumber(e.target.value)}
        />

        {/* Brand Filter */}
        <Select onValueChange={(value) => setBrandFilter(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand: Brand) => (
              <SelectItem key={brand.id} value={brand.id}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year Filter */}
        <Select
          onValueChange={(value) =>
            setYearFilter(value ? parseInt(value) : null)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Manufacturing Year" />
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

        {/* Date Range Filter */}
        <Select onValueChange={(value) => setDateRangeFilter(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Date Range" />
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
            <SelectItem value="lastSixMonths">Last 6 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <h2 className="font-bold py-2 text-xl">
        Bike Found : {`${filteredData.length}`}
      </h2>
      {/* Bike Items */}
      <div className="grid grid-cols-1 gap-4">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((data) => <BikeItem {...data} key={data._id} />)
        ) : (
          <p>No bikes found matching the filters.</p>
        )}
      </div>
    </div>
  );
}
