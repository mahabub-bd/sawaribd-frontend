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

export default async function UserActivity({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string }>;
}) {
  const { page, limit } = await searchParams;

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
        <Tabs defaultValue="all" className="w-full mb-6">
          <TabsList>
            <TabsTrigger value="all">All Activities</TabsTrigger>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="data">Data Changes</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="m-0">
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
                      {userActivities.data.map(
                        (activity: UserActivityTypes) => (
                          <UserActivityList
                            key={activity._id}
                            {...activity}
                            actionIcon={getActionIcon(activity.action)}
                          />
                        )
                      )}
                    </Suspense>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="signin" className="m-0">
            <div className="flex items-center justify-center p-8 border rounded-md bg-muted/10">
              <div className="flex flex-col items-center gap-2 text-center">
                <LogIn className="h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Signin activities will appear here
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data" className="m-0">
            <div className="flex items-center justify-center p-8 border rounded-md bg-muted/10">
              <div className="flex flex-col items-center gap-2 text-center">
                <FileEdit className="h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Data change activities will appear here
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="system" className="m-0">
            <div className="flex items-center justify-center p-8 border rounded-md bg-muted/10">
              <div className="flex flex-col items-center gap-2 text-center">
                <Settings className="h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">
                  System activities will appear here
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center gap-2 mt-4 text-sm text-muted-foreground">
          Showing
          <span className="font-medium text-foreground">{limitNumber}</span>out
          <span className="font-medium text-foreground">
            {userActivities?.total}
          </span>
          activities
          <PaginationComponent
            currentPage={pageNumber}
            totalPages={userActivities.totalPages}
          />
        </div>
      </CardContent>
    </Card>
  );
}
