"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bike } from "lucide-react";
import { useState } from "react";
import BikeAddForm from "../bike-information/bike-add-form";

export const BikeAddAction = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-2 py-1 px-4 rounded-md bg-green-100 hover:bg-green-200 text-green-600 transition"
          aria-label="Add New Bike Information"
        >
          <span>Add New Bike</span>
          <Bike size={20} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[1000px] h-[80vh] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Bike Information</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new bike information.
          </DialogDescription>
        </DialogHeader>
        {/* <BikeAddForm isOpen={setOpen} /> */}
        <BikeAddForm isOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default BikeAddAction;
