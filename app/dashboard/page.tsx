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
import { Mail, Shield, User } from "lucide-react";
import { CopyButton } from "@/components/dashboard/copy-button";

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

        {/* Additional cards can be added here for a complete admin dashboard */}
        <Card className="w-full shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Recent activity will appear here.
            </p>
          </CardContent>
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
