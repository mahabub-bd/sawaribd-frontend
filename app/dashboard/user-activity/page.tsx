import ErrorFallback from "@/components/common/ErrorFallback";
import { PaginationComponent } from "@/components/common/pagination";
import UserActivityList from "@/components/dashboard/user-activity/user-activity-list";
import TableSkeleton from "@/components/dashboard/user-activity/user-activity-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  LogIn,
  LogOut,
  FileEdit,
  Settings,
  FilePlus,
  Trash2,
} from "lucide-react";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Function to get icon based on action type
const getActionIcon = (action: string) => {
  const actionLower = action.toLowerCase();

  if (actionLower.includes("signin") || actionLower.includes("login")) {
    return <LogIn className="h-4 w-4 text-green-500" />;
  } else if (
    actionLower.includes("logout") ||
    actionLower.includes("signout")
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

// Helper function to filter activities by type
const filterActivities = (
  activities: UserActivityTypes[],
  filterType: string
) => {
  if (filterType === "all") return activities;

  return activities.filter((activity) => {
    const actionLower = activity.action.toLowerCase();

    if (filterType === "signin") {
      return actionLower.includes("signin") || actionLower.includes("login");
    } else if (filterType === "data") {
      return (
        actionLower.includes("update") ||
        actionLower.includes("edit") ||
        actionLower.includes("create") ||
        actionLower.includes("add") ||
        actionLower.includes("delete") ||
        actionLower.includes("remove")
      );
    } else if (filterType === "system") {
      return actionLower.includes("system") || actionLower.includes("config");
    }

    return false;
  });
};

export default async function UserActivity({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string; filter?: string }>;
}) {
  const { page, limit, filter = "all" } = await searchParams;

  const pageNumber = Number.parseInt(page) || 1;
  const limitNumber = Number.parseInt(limit) || 10;

  const userActivities = await fetchProtectedData(
    `user-activity?page=${pageNumber}&limit=${limitNumber}`
  );

  if (!userActivities || userActivities.length === 0) {
    return (
      <ErrorFallback message="No user activities available at the moment." />
    );
  }

  // Create filtered datasets for each tab
  const signinActivities = filterActivities(userActivities.data, "signin");
  const dataActivities = filterActivities(userActivities.data, "data");
  const systemActivities = filterActivities(userActivities.data, "system");

  // Function to render activity table
  const renderActivityTable = (activities: UserActivityTypes[]) => {
    if (activities.length === 0) {
      return (
        <div className="flex items-center justify-center p-8 border rounded-md bg-muted/10">
          <div className="flex flex-col items-center gap-2 text-center">
            <Activity className="h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground">
              No activities found for this filter
            </p>
          </div>
        </div>
      );
    }

    return (
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
              <Suspense fallback={<TableSkeleton />}>
                {activities.map((activity: UserActivityTypes) => (
                  <UserActivityList
                    key={activity._id}
                    {...activity}
                    actionIcon={getActionIcon(activity.action)}
                  />
                ))}
              </Suspense>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-md border-border/60">
      <CardHeader className="pb-3 space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-md">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">User Activities</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track user actions and system events
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue={filter} className="w-full mb-6">
          <TabsList>
            <TabsTrigger value="all">All Activities</TabsTrigger>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="data">Data Changes</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="m-0">
            {renderActivityTable(userActivities.data)}
          </TabsContent>

          <TabsContent value="signin" className="m-0">
            {renderActivityTable(signinActivities)}
          </TabsContent>

          <TabsContent value="data" className="m-0">
            {renderActivityTable(dataActivities)}
          </TabsContent>

          <TabsContent value="system" className="m-0">
            {renderActivityTable(systemActivities)}
          </TabsContent>
        </Tabs>

        <div className="flex flex-col items-center gap-4 mt-4 text-sm">
          <div className="text-center text-muted-foreground">
            Showing
            <span className="font-medium text-foreground mx-1">
              {limitNumber}
            </span>
            out of
            <span className="font-medium text-foreground mx-1">
              {userActivities?.total}
            </span>
            activities
          </div>
          <PaginationComponent
            currentPage={pageNumber}
            totalPages={userActivities.totalPages}
            baseUrl={`?filter=${filter}&limit=${limitNumber}&page=`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
