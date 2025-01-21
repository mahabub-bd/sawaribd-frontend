"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BikeDetailsType } from "@/types";
import { useState } from "react";
import BikeItem from "./bike-item";

interface BikeProps {
  bikedatas: BikeDetailsType[];
}

export default function BikeList({ bikedatas }: BikeProps) {
  const [brandFilter, setBrandFilter] = useState<string | null>("all");
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [engineNumber, setEngineNumber] = useState<string>("");
  const [chassisNumber, setChassisNumber] = useState<string>("");

  const currentYear = new Date().getFullYear();
  const lastEightYears = Array.from({ length: 8 }, (_, i) => currentYear - i);

  // Apply filtering logic
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

    return brandMatch && yearMatch && engineMatch && chassisMatch;
  });

  return (
    <div>
      {/* Filter Controls */}

      <div className="grid grid-cols-4 gap-4 md:py-4 py-2">
        {/* Engine Number Search */}
        <Input
          type="text"
          placeholder="Search by Engine Number"
          className="border border-gray-300 rounded px-3 py-2 "
          value={engineNumber}
          onChange={(e) => setEngineNumber(e.target.value)}
        />

        {/* Chassis Number Search */}
        <Input
          type="text"
          placeholder="Search by Chassis Number"
          className="border border-gray-300 rounded px-3 py-2 "
          value={chassisNumber}
          onChange={(e) => setChassisNumber(e.target.value)}
        />
        {/* Brand Filter */}
        <Select onValueChange={(value) => setBrandFilter(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent side="right">
            <SelectItem value="all">All Brands</SelectItem>
            <SelectItem value="Honda">Honda</SelectItem>
            <SelectItem value="Yamaha">Yamaha</SelectItem>
            <SelectItem value="Suzuki">Suzuki</SelectItem>
          </SelectContent>
        </Select>

        {/* Year Filter */}
        <Select
          onValueChange={(value) =>
            setYearFilter(value ? parseInt(value) : null)
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Manufacturing Year" />
          </SelectTrigger>
          <SelectContent side="right">
            <SelectItem value="all">All Years</SelectItem>
            {lastEightYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <h2 className="font-bold py-2 text-center text-2xl">
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
