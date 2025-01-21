import SignInform from "@/components/auth/signin-form";
import { Logo } from "@/public";
import Image from "next/image";

export default function SignInPage() {
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
      <h1 className="text-center text-2xl font-bold my-2 text-gray-900">
        Sign In{" "}
      </h1>
      <p className="py-2 text-sm text-gray-600">
        Enter your credentials to access your account
      </p>
      <SignInform />
    </div>
  );
}
