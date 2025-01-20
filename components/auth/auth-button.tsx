import { getSession } from "@/lib/session";
import {
  ChevronDown,
  CircleUserRound,
  LayoutDashboard,
  LogInIcon,
} from "lucide-react"; // Import Lucide icons
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SignOutButton } from "./signout-button";

const AuthBtn = async () => {
  const session = await getSession();

  return (
    <div className="flex items-center gap-4 ml-auto">
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-slate-800 rounded-md shadow-md hover:bg-primary-dark transition dark:bg-slate-800 dark:hover:bg-primary-dark">
            <div className="flex items-center gap-2">
              <CircleUserRound className="size-5" />
              <span>{session?.user?.name}</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white shadow-md rounded-md p-4 dark:bg-slate-800 dark:text-white">
            <DropdownMenuLabel className="text-sm font-bold text-gray-800 dark:text-white">
              Welcome, {session.user.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href={"/dashboard"}
                className="flex items-center gap-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 px-2 py-2 rounded-md"
              >
                <LayoutDashboard className="w-4 h-4 text-gray-600 dark:text-gray-200" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild className="flex items-center gap-2 py-1">
              <SignOutButton>Sign Out</SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/auth/signin"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-md shadow-md hover:bg-primary-dark transition focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-slate-800 dark:hover:bg-primary-dark"
        >
          <LogInIcon className="size-4 text-white" />
          Sign In
        </Link>
      )}
    </div>
  );
};

export default AuthBtn;
