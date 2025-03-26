"use client";

import type { User } from "@/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserEditForm from "../users/UserEditForm";
import { Button } from "@/components/ui/button";

interface UserEditActionProps {
  user: User;
  id: string;
}

export function UserEditAction({ user, id }: UserEditActionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="h-8 px-2 bg-gray-50 hover:bg-gray-100 border-gray-200"
      >
        <Pencil size={16} />
        <span className="sr-only">Edit User</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <UserEditForm user={user} isOpen={setIsOpen} id={id} />
        </DialogContent>
      </Dialog>
    </>
  );
}
