import SignInForm from "@/components/auth/signin-form";
import { Logo } from "@/public";
import Image from "next/image";

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 py-12">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <div className="flex justify-center">
          <Image
            src={Logo}
            alt="Logo"
            width={192}
            height={108}
            className="w-48"
            priority
          />
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
        </div>

        <div className="mt-6">
          <SignInForm />
        </div>
      </div>
    </section>
  );
}
