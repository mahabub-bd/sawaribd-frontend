"use client";

import { signOut } from "@/actions/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const SignOutButton = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    toast.success("You have been signed out.");
    router.push("/");
  };

  return (
    <Button
      className="flex items-center gap-2 text-sm mt-2 bg-gray-800 rounded-md shadow-md hover:bg-primary-dark transition focus:ring-2 focus:ring-primary focus:ring-offset-2"
      onClick={handleSignOut}
    >
      <LogOut className="w-4 h-4 text-gray-200" />
      {children}
    </Button>
  );
};
