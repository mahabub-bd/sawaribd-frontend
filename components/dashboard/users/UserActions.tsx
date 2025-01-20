"use client";
import { User } from "@/types";
import { UserEditAction } from "../modal/UserEditAction";
import UserDeleteAction from "./UserDeleteAction";
interface UserActionsProps {
  id: string;
  user: User;
}

const UserActions = ({ user, id }: UserActionsProps) => {
  return (
    <div className="flex gap-4 justify-end">
      <UserEditAction user={user} id={id} />
      <UserDeleteAction user={user} id={id} />
    </div>
  );
};

export default UserActions;
