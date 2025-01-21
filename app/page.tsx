import { Logo } from "@/public";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <section className="flex  flex-col items-center justify-center min-h-screen bg-gray-50 py-12">
      <Image
        src={Logo}
        alt="Logo"
        width={192}
        height={108}
        className="w-48"
        priority
      />
      <Link
        className="bg-black px-8 py-1 text-white rounded-xl"
        href={"/auth/signin"}
      >
        Login
      </Link>
    </section>
  );
}
