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

export default async function UserList() {
  const users = await fetchData("users");

  return (
    <section className="md:p-4 p-4 bg-white shadow-xl rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">User Found : {users?.length}</h2>

        <div className="ml-auto">
          <UserAddAction />
        </div>
      </div>

      <Table>
        <TableCaption className="font-bold">User List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>User Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users && users.length > 0 ? (
            users.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className=" capitalize">{user.role}</TableCell>
                <TableCell className="text-right space-x-2">
                  <UserActions id={user._id} user={user} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
