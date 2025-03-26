import ErrorFallback from "@/components/common/ErrorFallback";
import { PaginationComponent } from "@/components/common/pagination";
import UserActivityList from "@/components/dashboard/user-activity/user-activity-list";
import TableSkeleton from "@/components/dashboard/user-activity/user-activity-skeleton";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserActivityTypes } from "@/types";
import { fetchProtectedData } from "@/utils/apiServices";

import { Suspense } from "react";

export default async function UserActivity({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string }>;
}) {
  const { page, limit } = await searchParams;

  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;

  const userActivities = await fetchProtectedData(
    `user-activity?page=${pageNumber}&limit=${limitNumber}`
  );

  if (!userActivities || userActivities.length === 0) {
    return (
      <ErrorFallback message="No userActivities  available at the moment." />
    );
  }
  return (
    <Card className="md:p-8 p-4 bg-white shadow-lg rounded-lg ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">User Activities</h1>
        <h2 className="text-sm text-gray-600 mt-2 md:mt-0">
          Showing {limitNumber} out of {userActivities?.total} items
        </h2>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-medium text-gray-700">User</TableHead>
              <TableHead className="font-medium text-gray-700">
                User Role
              </TableHead>
              <TableHead className="font-medium text-gray-700">
                Action
              </TableHead>
              <TableHead className="font-medium text-gray-700">Path</TableHead>
              <TableHead className="font-medium text-gray-700 text-right">
                Date & Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Suspense fallback={<TableSkeleton />}>
              {userActivities.data.map((activity: UserActivityTypes) => (
                <UserActivityList key={activity._id} {...activity} />
              ))}
            </Suspense>
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-end mt-7">
        <PaginationComponent
          currentPage={pageNumber}
          totalPages={userActivities.totalPages}
        />
      </div>
    </Card>
  );
}
