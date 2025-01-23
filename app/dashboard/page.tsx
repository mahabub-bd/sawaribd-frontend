import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/session";

const AdminDashboard = async () => {
  const session = await getSession();

  return (
    <section className="container h-s mx-auto md:p-8 p-6 bg-white shadow-2xl rounded-lg ">
      <Card className="w-full  shadow-lg rounded-md border border-gray-200 bg-white">
        <CardHeader className="p-4 border-b border-gray-200">
          <CardTitle className="text-lg font-bold">
            Name: {session?.user?.name || "User Name"}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 space-y-2">
          <p className="text-gray-600">
            <span className="font-medium">Role:</span>
            {session?.user?.role || "User Role"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Email:</span>{" "}
            {session?.user?.email || "Email not provided"}
          </p>
        </CardContent>

        <CardFooter className="p-4 border-t border-gray-200">
          <p className="text-gray-600">
            <span className="font-medium">User ID:</span>{" "}
            {session?.user?.id || "ID not available"}
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default AdminDashboard;
