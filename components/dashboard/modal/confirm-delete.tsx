"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trash, TriangleAlertIcon, X } from "lucide-react";
import { useState } from "react";

interface ConfirmDeleteProps {
    title?: string;
    description?: string;
    onConfirm: () => Promise<void> | void;
    trigger: React.ReactNode;
}

export default function ConfirmDelete({
    title = "Confirm Delete",
    description = "Are you sure you want to delete this item? This action cannot be undone.",
    onConfirm,
    trigger,
}: ConfirmDeleteProps) {
    const [open, setOpen] = useState(false);

    const handleConfirm = async () => {
        try {
            await onConfirm();
            setOpen(false);
        } catch (error) {
            console.error("Error during confirmation action:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex flex-col gap-5 items-center justify-center">
                    <div className="bg-red-100 p-4 rounded-full">
                        <TriangleAlertIcon color="red" size={40} />
                    </div>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm}>
                        <Trash className="mr-2 h-4 w-4" />
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
