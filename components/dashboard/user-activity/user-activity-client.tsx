"use client";

import type React from "react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Tabs } from "@/components/ui/tabs";
import { useCallback } from "react";

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

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleTabChange = (value: string) => {
    router.push(`${pathname}?${createQueryString("filter", value)}`);
  };

  return (
    <Tabs
      defaultValue={defaultValue}
      onValueChange={handleTabChange}
      className="w-full mb-6"
    >
      {children}
    </Tabs>
  );
}
