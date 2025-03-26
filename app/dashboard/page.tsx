import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/session";
import {
  Mail,
  Shield,
  User,
  Clock,
  Activity,
  AlertCircle,
  LogIn,
  LogOut,
  FileEdit,
  FilePlus,
  Trash2,
} from "lucide-react";
import { CopyButton } from "@/components/dashboard/copy-button";

// Define the activity type based on the actual API response
interface UserActivity {
  _id: string;
  userId: string;
  action: string;
  path: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// This is a Server Component (no "use client" directive)
const AdminDashboard = async () => {
  const session = await getSession();

  // Function to generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const userName = session?.user?.name || "User Name";
  const userRole = session?.user?.role || "User";
  const userEmail = session?.user?.email || "Email not provided";
  const userId = session?.user?.id || "ID not available";

  // Fetch user activity data
  let userActivity: UserActivity[] = [];
  let activityError = null;

  try {
    const response = await fetch(
      `https://api.sawaribd.com/user-activity/${userId}/recent`,
      {
        cache: "no-store", // Don't cache this data
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch activity: ${response.status}`);
    }

    const responseData = await response.json();

    // Check if the response is an array
    if (Array.isArray(responseData)) {
      userActivity = responseData;
    } else if (responseData && typeof responseData === "object") {
      // If it's an object with data property that's an array
      if (Array.isArray(responseData.data)) {
        userActivity = responseData.data;
      } else if (
        responseData.activities &&
        Array.isArray(responseData.activities)
      ) {
        userActivity = responseData.activities;
      } else {
        // If it's a single activity object, wrap it in an array
        if (responseData._id) {
          userActivity = [responseData];
        } else {
          console.error("Unexpected API response format:", responseData);
          throw new Error("Unexpected API response format");
        }
      }
    } else {
      console.error("Unexpected API response format:", responseData);
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("Error fetching user activity:", error);
    activityError =
      error instanceof Error ? error.message : "Failed to load activity data";
  }

  // Format date for display
  const formatActivityDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  // Get action color and icon based on action type
  const getActionInfo = (action: string) => {
    const actionLower = action.toLowerCase();

    if (actionLower.includes("signin") || actionLower.includes("login")) {
      return {
        color:
          "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
        icon: <LogIn className="h-4 w-4" />,
      };
    } else if (
      actionLower.includes("signout") ||
      actionLower.includes("logout")
    ) {
      return {
        color:
          "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
        icon: <LogOut className="h-4 w-4" />,
      };
    } else if (actionLower.includes("create") || actionLower.includes("add")) {
      return {
        color:
          "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
        icon: <FilePlus className="h-4 w-4" />,
      };
    } else if (actionLower.includes("update") || actionLower.includes("edit")) {
      return {
        color:
          "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
        icon: <FileEdit className="h-4 w-4" />,
      };
    } else if (
      actionLower.includes("delete") ||
      actionLower.includes("remove")
    ) {
      return {
        color: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
        icon: <Trash2 className="h-4 w-4" />,
      };
    } else {
      return {
        color:
          "bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400",
        icon: <Activity className="h-4 w-4" />,
      };
    }
  };

  // Get a human-readable description from the path
  const getActivityDescription = (path: string, action: string) => {
    // Remove leading slash and split by slashes
    const pathParts = path.replace(/^\//, "").split("/");

    // Format the path for better readability
    if (pathParts[0] === "auth") {
      if (action.toLowerCase().includes("signin")) {
        return "User signed in to the system";
      } else if (action.toLowerCase().includes("signout")) {
        return "User signed out from the system";
      } else {
        return `Authentication action: ${action}`;
      }
    } else if (pathParts[0] === "api") {
      // Handle API paths
      const resource = pathParts[1] || "resource";
      return `${action} on ${resource.replace(/-/g, " ")}`;
    } else {
      // Default description
      return `${action} at ${path}`;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {/* User Profile Card */}
        <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Profile</CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {userRole}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage src={session?.user?.image || ""} alt={userName} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-xl font-semibold">{userName}</h2>
                <p className="text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {userEmail}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">User ID:</span>
                <span className="text-sm text-muted-foreground flex-1 truncate">
                  {userId}
                </span>
                {/* Client component for clipboard functionality */}
                <CopyButton textToCopy={userId} />
              </div>

              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Role:</span>
                <span className="text-sm text-muted-foreground">
                  {userRole}
                </span>
              </div>
            </div>
          </CardContent>

          <Separator />

          <CardFooter className="pt-4">
            <div className="w-full flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Last login: Today at 10:23 AM
              </span>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
              >
                Active
              </Badge>
            </div>
          </CardFooter>
        </Card>

        {/* Activity Card */}
        <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              {userActivity.length > 0 && (
                <Badge variant="secondary">{userActivity.length}</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {activityError ? (
              <div className="flex items-center justify-center p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                  <p className="text-muted-foreground">{activityError}</p>
                </div>
              </div>
            ) : userActivity.length === 0 ? (
              <div className="flex items-center justify-center p-6 text-center">
                <p className="text-muted-foreground">
                  No recent activity found.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {Array.isArray(userActivity) &&
                  userActivity.map((activity) => {
                    if (!activity || typeof activity !== "object") return null;

                    const { color, icon } = getActionInfo(
                      activity.action || "Unknown"
                    );
                    return (
                      <div
                        key={activity._id || `activity-${Math.random()}`}
                        className="flex items-start gap-3 pb-4 border-b last:border-0"
                      >
                        <div className={`p-2 rounded-full ${color}`}>
                          {icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant="outline" className={color}>
                              {activity.action || "Unknown"}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {activity.createdAt
                                ? formatActivityDate(activity.createdAt)
                                : "Unknown time"}
                            </span>
                          </div>
                          <p className="text-sm line-clamp-2">
                            {activity.path
                              ? getActivityDescription(
                                  activity.path,
                                  activity.action || "Unknown"
                                )
                              : "Unknown activity"}
                          </p>
                          {activity.path && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Path: {activity.path}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-2 flex justify-center">
            {userActivity.length > 5 && (
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-muted/50"
              >
                View all activity
              </Badge>
            )}
          </CardFooter>
        </Card>

        <Card className="w-full shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              User statistics will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
