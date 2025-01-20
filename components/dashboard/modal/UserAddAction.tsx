"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BadgePlus } from "lucide-react";
import { useState } from "react";
import UserAddForm from "../users/UserAddForm";

export const UserAddAction = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-2 py-1 px-4 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
          aria-label="Add New Blog"
        >
          <span>Add New </span>
          <BadgePlus size={20} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill in the details for add new user.
          </DialogDescription>
        </DialogHeader>
        <UserAddForm isOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
