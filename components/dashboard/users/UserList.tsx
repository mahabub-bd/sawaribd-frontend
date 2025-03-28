import { fetchData } from "@/utils/apiServices";

import { UserListSearch } from "./user-list-search";

export default async function UserList() {
  const users = await fetchData("users");

  return (
    <section className="bg-white rounded-lg shadow-sm border">
      <div className="p-2 md:p-4 border-b">
        <div className="flex flex-col  justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Users</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage user accounts and permissions
            </p>
          </div>
          <UserListSearch users={users} />
        </div>
      </div>
    </section>
  );
}
