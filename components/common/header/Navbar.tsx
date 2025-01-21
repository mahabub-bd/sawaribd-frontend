import AuthBtn from "@/components/auth/auth-button";
import { getSession } from "@/lib/session";
import { Logo } from "@/public";
import Image from "next/image";
import Link from "next/link";
import MobileNavigation from "./mobile-nav";

export default async function Navbar() {
  const session = await getSession();
  return (
    <div className="bg-white dark:bg-slate-800 sticky top-0 z-40 shadow-md  md:px-0 px-4">
      <nav className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between w-full">
          <Link href="/dashboard">
            <Image src={Logo} alt="logo" height={100} />
          </Link>

          <div className="lg:flex hidden gap-4">
            <AuthBtn />
          </div>
          <div className="lg:hidden flex ">
            <MobileNavigation session={session} />
          </div>
        </div>
      </nav>
    </div>
  );
}
