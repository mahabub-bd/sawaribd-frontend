'use client'

import { deleteDataById } from "@/utils/apiServices";
import { serverRevalidate } from "@/utils/revalidatePath";
import { DeleteIcon } from "lucide-react";
import { toast } from "sonner";
import ConfirmDelete from "../modal/confirm-delete";

interface MessageDeleteActionProps {
    id: string;
}

export default function MessageDeleteAction({ id }: MessageDeleteActionProps) {
    const handleDelete = async () => {
        try {
            await deleteDataById("message", id);
            toast.success("Message deleted successfully!");
            serverRevalidate("/dashboard/message");
        } catch (error: any) {
            console.error(
                `Error deleting message with ID: ${id}`,
                error.message || error
            );
            toast.error(error?.message || "Failed to delete message. Please try again.");
        }
    };

    return (
        <ConfirmDelete
            title="Delete Message"
            description="Are you sure you want to delete this message? This action cannot be undone."
            onConfirm={handleDelete}
            trigger={
                <button className="p-2 rounded-md bg-red-100 hover:bg-red-200 text-red-600 transition">
                    <DeleteIcon size={18} />
                </button>
            }
        />
    );
}
