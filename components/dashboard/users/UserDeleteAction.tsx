"use client";

import { User } from "@/types";
import { deleteDataById } from "@/utils/apiServices";
import { serverRevalidate } from "@/utils/revalidatePath";
import { DeleteIcon } from "lucide-react";
import { toast } from "sonner";
import ConfirmDelete from "../modal/confirm-delete";

interface UserDeleteActionProps {
  user: User;
  id: string;
}

export default function UserDeleteAction({ user, id }: UserDeleteActionProps) {
  const handleDelete = async () => {
    try {
      await deleteDataById("users", id);
      toast.success("User deleted successfully!");
      serverRevalidate("/dashboard/user");
    } catch (error: any) {
      console.error(
        `Error deleting user with ID: ${id}`,
        error.message || error
      );
      toast.error(error?.message || "Failed to delete user. Please try again.");
    }
  };

  return (
    <ConfirmDelete
      title="Delete User"
      description={`Are you sure you want to delete user "${user.name}"? This action cannot be undone.`}
      onConfirm={handleDelete}
      trigger={
        <button
          title="Delete User"
          className="px-2 py-1 text-sm rounded flex items-center transition bg-red-600 text-white hover:bg-red-700"
        >
          <DeleteIcon size={18} />
        </button>
      }
    />
  );
}
