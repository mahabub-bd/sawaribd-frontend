"use client";

import type React from "react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tabs } from "@/components/ui/tabs";
import { useCallback, useEffect, useState } from "react";

interface UserActivityTabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

export function UserActivityTabs({
  defaultValue,
  children,
}: UserActivityTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentValue, setCurrentValue] = useState(defaultValue);

  // Update the current value when the URL changes
  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      setCurrentValue(filter);
    }
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      // Preserve the page and limit parameters
      if (!params.has("page")) params.set("page", "1");
      if (!params.has("limit")) params.set("limit", "10");

      return params.toString();
    },
    [searchParams]
  );

  const handleTabChange = (value: string) => {
    setCurrentValue(value);
    router.push(`${pathname}?${createQueryString("filter", value)}`);
  };

  return (
    <Tabs
      value={currentValue}
      defaultValue={defaultValue}
      onValueChange={handleTabChange}
      className="w-full mb-6"
    >
      {children}
    </Tabs>
  );
}
