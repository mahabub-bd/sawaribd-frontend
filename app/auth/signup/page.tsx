import SignUpForm from "@/components/auth/signup-form";
import { Logo } from "@/public";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl w-96 flex flex-col justify-center items-center">
      <Image
        src={Logo}
        alt="Logo"
        width={192}
        height={108}
        className="w-48"
        priority
      />
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
        Create Your Account
      </h2>
      <p className="py-2 text-sm">Fill in the form below to create account.</p>

      <SignUpForm />
      <div className="flex justify-between text-sm mt-4 gap-4">
        <p>Alrady have an account ?</p>
        <Link href={"/auth/signin"} className="underline font-semibold">
          Sign In
        </Link>
      </div>
    </div>
  );
}
