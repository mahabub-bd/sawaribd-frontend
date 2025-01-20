"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/public";

import { SignOutButton } from "@/components/auth/signout-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  CircleUserRound,
  LayoutDashboard,
  MenuIcon,
  UserPlusIcon,
} from "lucide-react";

export default function MobileNavigation({ session }: { session: any }) {
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSubMenu = (id: number) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => setIsSheetOpen(true)}
        >
          <MenuIcon className="h-6 w-6 text-primary shadow-xl" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetTitle>
          <Image src={Logo} alt="logo" width={80} />
          <Link href="/signin" className="sr-only">
            Signin
          </Link>
        </SheetTitle>

        <div className="flex flex-col items-start gap-4 p-6">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-md shadow-md hover:bg-primary-dark transition">
                <div className="flex items-center gap-2">
                  <CircleUserRound className="size-5" />
                  <span>{session?.user?.name}</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-white shadow-md rounded-md p-4">
                <DropdownMenuLabel className="text-sm font-bold text-gray-800">
                  Welcome, {session.user.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link
                    href={"/dashboard"}
                    className="flex items-center gap-2 text-sm hover:bg-gray-100 px-2 py-2 rounded-md"
                  >
                    <LayoutDashboard className="w-4 h-4 text-gray-600" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  asChild
                  className="flex items-center gap-2 py-1"
                >
                  <SignOutButton>Sign Out</SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/auth/signin"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md shadow-md hover:bg-primary-dark transition focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={closeSheet}
            >
              <UserPlusIcon className="size-4 text-white" />
              Sign In
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
