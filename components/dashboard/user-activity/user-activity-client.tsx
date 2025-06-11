"use client";
import { PaginationComponent } from "@/components/common/pagination";
import UserActivityList from "@/components/dashboard/user-activity/user-activity-list";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserActivityTypes } from "@/types";
import { fetchProtectedData } from "@/utils/apiServices";
import {
  Activity,
  FileEdit,
  FilePlus,
  LogIn,
  LogOut,
  Settings,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserActivityClientProps {
  initialPage: number;
  initialLimit: number;
}

interface ApiResponse {
  message: string;
  statusCode: number;
  data: UserActivityTypes[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Function to get icon based on action type
const getActionIcon = (action: string) => {
  const actionLower = action.toLowerCase();

  if (actionLower.includes("sign in") || actionLower.includes("login")) {
    return <LogIn className="h-4 w-4 text-green-500" />;
  } else if (
    actionLower.includes("sign out") ||
    actionLower.includes("logout")
  ) {
    return <LogOut className="h-4 w-4 text-orange-500" />;
  } else if (actionLower.includes("update") || actionLower.includes("edit")) {
    return <FileEdit className="h-4 w-4 text-blue-500" />;
  } else if (actionLower.includes("create") || actionLower.includes("add")) {
    return <FilePlus className="h-4 w-4 text-indigo-500" />;
  } else if (actionLower.includes("delete") || actionLower.includes("remove")) {
    return <Trash2 className="h-4 w-4 text-red-500" />;
  } else if (actionLower.includes("system") || actionLower.includes("config")) {
    return <Settings className="h-4 w-4 text-purple-500" />;
  } else {
    return <Activity className="h-4 w-4 text-gray-500" />;
  }
};

// Standardize action names for display
const formatActionName = (action: string): string => {
  const actionLower = action.toLowerCase();

  if (actionLower.includes("login") || actionLower.includes("signin")) {
    return "Sign In";
  }
  if (actionLower.includes("logout") || actionLower.includes("signout")) {
    return "Sign Out";
  }

  // Capitalize first letter of other actions
  return action.charAt(0).toUpperCase() + action.slice(1);
};

export function UserActivityClient({
  initialPage,
  initialLimit,
}: UserActivityClientProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [activities, setActivities] = useState<UserActivityTypes[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch activities from API
  const fetchActivities = async (page: number, pageLimit: number) => {
    try {
      setLoading(true);
      setError(null);

      const response: ApiResponse = await fetchProtectedData(
        `user-activity?page=${page}&limit=${pageLimit}`
      );

      if (response && response.data) {
        // Process activities to standardize action names
        const processedActivities = response.data.map(
          (activity: UserActivityTypes) => ({
            ...activity,
            action: formatActionName(activity.action),
          })
        );

        setActivities(processedActivities);
        setTotalPages(response.totalPages);
        setTotal(response.total);
      } else {
        setError("No activities found");
      }
    } catch (err) {
      setError("Failed to fetch activities");
      console.error("Error fetching activities:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchActivities(currentPage, limit);
  }, []);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchActivities(page, limit);

    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", limit.toString());
    router.push(url.pathname + url.search, { scroll: false });
  };

  // Calculate display range
  const startIndex = (currentPage - 1) * limit + 1;
  const endIndex = Math.min(currentPage * limit, total);

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 border rounded-md bg-muted/10">
        <div className="flex flex-col items-center gap-2 text-center">
          <Activity className="h-8 w-8 text-muted-foreground" />
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 border rounded-md bg-muted/10">
        <div className="flex flex-col items-center gap-2 text-center">
          <Activity className="h-8 w-8 text-muted-foreground" />
          <p className="text-muted-foreground">No activities found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-md border border-border/60 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium text-xs uppercase text-muted-foreground tracking-wider w-[20%]">
                  User
                </TableHead>
                <TableHead className="font-medium text-xs uppercase text-muted-foreground tracking-wider w-[15%]">
                  Role
                </TableHead>
                <TableHead className="font-medium text-xs uppercase text-muted-foreground tracking-wider w-[15%]">
                  Action
                </TableHead>
                <TableHead className="font-medium text-xs uppercase text-muted-foreground tracking-wider w-[30%]">
                  Path
                </TableHead>
                <TableHead className="font-medium text-xs uppercase text-muted-foreground tracking-wider text-right w-[20%]">
                  Date & Time
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <UserActivityList
                  key={activity._id}
                  {...activity}
                  actionIcon={getActionIcon(activity.action)}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 text-sm text-muted-foreground">
        <span>
          Showing <strong className="text-foreground mx-1">{startIndex}</strong>{" "}
          to <strong className="text-foreground mx-1">{endIndex}</strong> of{" "}
          <strong className="text-foreground mx-1">{total}</strong> activities
        </span>

        {totalPages > 1 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}
