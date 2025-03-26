import { Logo } from "@/public";
import Image from "next/image";
import Link from "next/link";
import SignInPage from "./auth/signin/page";

export default function Page() {
  return (
    <section className="flex  flex-col items-center justify-center min-h-screen bg-gray-50 py-12">
      <SignInPage />
    </section>
  );
}
