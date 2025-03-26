import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchData } from "@/utils/apiServices";
import { UserAddAction } from "../modal/UserAddAction";
import UserActions from "./UserActions";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function UserList() {
  const users = await fetchData("users");

  return (
    <section className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 md:p-6 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Users</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage user accounts and permissions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:ml-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                className="pl-9 w-full sm:w-[250px] bg-gray-50 border-gray-200 focus-visible:ring-primary"
              />
            </div>
            <UserAddAction />
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="font-medium">Email</TableHead>
                <TableHead className="font-medium">Created At</TableHead>
                <TableHead className="font-medium">Role</TableHead>
                <TableHead className="text-right font-medium">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users && users.length > 0 ? (
                users.map((user: any) => (
                  <TableRow key={user._id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <RoleBadge role={user.role} />
                    </TableCell>
                    <TableCell className="text-right">
                      <UserActions id={user._id} user={user} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableCaption className="pb-4">
              {users?.length > 0
                ? `Total ${users.length} users`
                : "No users available"}
            </TableCaption>
          </Table>
        </div>
      </div>
    </section>
  );
}

function RoleBadge({ role }: { role: string }) {
  switch (role) {
    case "admin":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200 border">
          Admin
        </Badge>
      );
    case "moderator":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200 border">
          Moderator
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200 border">
          User
        </Badge>
      );
  }
}
