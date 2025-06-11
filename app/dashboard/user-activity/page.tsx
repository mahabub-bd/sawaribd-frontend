import { UserActivityClient } from "@/components/dashboard/user-activity/user-activity-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default async function UserActivity({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const { page = "1", limit = "10" } = await searchParams;
  const pageNumber = Number.parseInt(page) || 1;
  const limitNumber = Number.parseInt(limit) || 10;

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
        <UserActivityClient
          initialPage={pageNumber}
          initialLimit={limitNumber}
        />
      </CardContent>
    </Card>
  );
}
