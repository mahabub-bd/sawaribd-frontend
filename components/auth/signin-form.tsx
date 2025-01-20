"use client";

import { signIn } from "@/actions/auth";

import { useActionState } from "react";
import InputField from "../common/input-field";
import { SubmitButton } from "./submit-button";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);

  return (
    <form action={action} className="w-full">
      {/* Email Field */}
      <InputField
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={state?.error?.email}
      />

      {/* Password Field */}
      <InputField
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={state?.error?.password}
        showPasswordToggle={true} // Enable password visibility toggle
      />

      {state?.message && (
        <div
          className={`mt-2 px-2 py-1 rounded border ${
            state.message ? "text-red-800 bg-red-100 border-red-300" : ""
          }`}
        >
          <p className="text-sm">{state.message}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <SubmitButton>Sign In</SubmitButton>
      </div>
    </form>
  );
};

export default SignInForm;
