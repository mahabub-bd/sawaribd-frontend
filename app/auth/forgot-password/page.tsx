import ForgetPasswordForm from "@/components/auth/forgetPassword-form";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-2 text-gray-900">
        Forgot Password
      </h1>
      <p className="py-2 text-sm text-gray-600 text-center">
        Enter your email to receive the reset link.
      </p>
      <ForgetPasswordForm />

      <div className="mt-4">
        <p className="text-sm text-gray-800">
          Remembered your password?{" "}
          <Link
            href="/auth/signin"
            className="text-gray-800 underline hover:text-gray-900 font-semibold "
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
