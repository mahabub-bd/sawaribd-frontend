import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getSession } from "@/lib/session";
import { User } from "@/types";
import { fetchData } from "@/utils/apiServices";
import { formatDateTime } from "@/utils/helper";

export default async function UserStatistics({ userId }: { userId: string }) {
  // Verify session first
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized - Please log in");
  }

  try {
    const [activityResponse, userResponse] = await Promise.all([
      fetchData(`user-activity/${userId || null}`),
      fetch(`https://api.sawaribd.com/users/${userId}`),
    ]);

    if (!activityResponse || !userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const [activity, userInfo]: [any[], User] = await Promise.all([
      activityResponse,
      userResponse.json(),
    ]);

    const today = new Date().toISOString().split("T")[0];

    // Process data
    const actionToday = activity.filter((item) =>
      item.createdAt.startsWith(today)
    );

    const totalSignIn = activity.reduce(
      (count, item) => (item.action === "Sign In" ? count + 1 : count),
      0
    );

    const lastActive = [...activity].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0]?.createdAt;

    return (
      <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-300 md:p-6 p-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Total Logins" value={totalSignIn} isLarge={true} />
            <StatCard
              label="Actions Today"
              value={actionToday.length}
              isLarge={true}
            />
            <StatCard
              label="Last Active"
              value={formatDateTime(lastActive)}
              isLarge={false}
            />
            <StatCard
              label="Account Created"
              value={formatDateTime(userInfo?.createdAt)}
              isLarge={false}
            />
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error("Error in UserStatistics:", error);
    return (
      <Card className="w-full">
        <CardContent className="p-4 text-destructive">
          Error loading user statistics. Please try again.
        </CardContent>
      </Card>
    );
  }
}

function StatCard({
  label,
  value,
  isLarge,
}: {
  label: string;
  value: string | number;
  isLarge: boolean;
}) {
  return (
    <div className="bg-primary/5 rounded-lg p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <h3 className={`${isLarge ? "text-2xl" : "text-lg"}  mt-1`}>{value}</h3>
    </div>
  );
}
