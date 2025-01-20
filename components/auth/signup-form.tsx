"use client";

import { signUp } from "@/actions/auth";

import { useActionState } from "react";
import InputField from "../common/input-field";
import { SubmitButton } from "./submit-button";

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);

  return (
    <form action={action} className="w-full">
      {/* Name Field */}
      <InputField
        id="name"
        name="name"
        label="Name"
        type="text"
        placeholder="Enter your name"
        error={state?.error?.name}
        ariaDescribedBy="name-error"
      />

      {/* Email Field */}
      <InputField
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={state?.error?.email}
        ariaDescribedBy="email-error"
      />

      {/* Password Field */}
      <InputField
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={state?.error?.password}
        showPasswordToggle={true}
        ariaDescribedBy="password-error"
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
        <SubmitButton>Sign Up</SubmitButton>
      </div>
    </form>
  );
};

export default SignUpForm;
