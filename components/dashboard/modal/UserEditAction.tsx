"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/types";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import UserEditForm from "../users/UserEditForm";

interface UserEditActionProps {
  id: string;
  user: User;
}

export const UserEditAction = ({ id, user }: UserEditActionProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`p-2 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-600 transition`}
        >
          <EditIcon size={18} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit User Information</DialogTitle>
          <DialogDescription>
            Update the user information below and click save when done.
          </DialogDescription>
        </DialogHeader>

        <UserEditForm isOpen={setOpen} user={user} id={id} />
      </DialogContent>
    </Dialog>
  );
};
