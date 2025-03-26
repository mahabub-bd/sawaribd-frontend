"use client";
import type { User } from "@/types";
import { UserEditAction } from "../modal/UserEditAction";
import UserDeleteAction from "./UserDeleteAction";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface UserActionsProps {
  id: string;
  user: User;
}

const UserActions = ({ user, id }: UserActionsProps) => {
  return (
    <div className="flex items-center justify-end gap-2">
      {/* Desktop view - show buttons */}
      <div className="hidden sm:flex gap-2">
        <UserEditAction user={user} id={id} />
        <UserDeleteAction user={user} id={id} />
      </div>

      {/* Mobile view - show dropdown */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button
                className="w-full flex items-center cursor-pointer"
                onClick={() => {}}
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="text-red-600 focus:text-red-600"
            >
              <button
                className="w-full flex items-center cursor-pointer"
                onClick={() => {}}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserActions;
