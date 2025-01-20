"use server";

import { backendUrl } from "@/constants";
import {
  createSession,
  deleteSession,
  getSession,
  saveSession,
} from "@/lib/session";
import {
  ForgetPasswordSchema,
  FormState,
  SigninFormSchema,
  SignupFormSchema,
} from "@/types/form-validation";
import { redirect } from "next/navigation";

export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${backendUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  if (response.ok) {
    redirect("/auth/signin");
  } else
    return {
      message:
        response.status === 400
          ? "The user is already existed!"
          : response.statusText,
    };
}

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${backendUrl}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  if (response.ok) {
    const data = await response.json();

    if (data.tokens) {
      await createSession({
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        },
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken,
      });
      redirect("/dashboard");
    }
  } else {
    const data = await response.json();

    return {
      message: data.message,
    };
  }
}

export async function signOut() {
  try {
    const session = await getSession();

    if (!session || !session.accessToken) {
      console.error("No valid session or access token found.");
      return;
    }

    const response = await fetch(`${backendUrl}/auth/logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await deleteSession();
    }
  } catch (error) {
    console.error("Error during signout:", error);
  }
}

export async function refreshToken() {
  try {
    const session = await getSession();
    if (!session?.refreshToken) {
      throw new Error("No refresh token available.");
    }

    const response = await fetch(`${backendUrl}/auth/refresh`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token.");
    }

    const data = await response.json();

    if (!data.accessToken) {
      throw new Error("No access token returned from refresh.");
    }

    await saveSession({
      ...session,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken || session.refreshToken,
    });

    return data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}

export async function forgotPassword(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = ForgetPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  console.log("validationFields", validationFields);

  // const response = await fetch(`${backendUrl}/auth/forgot-password`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email: validationFields.data.email }),
  // });

  // if (response.ok) {
  //   const data = await response.json();
  //   return {
  //     message: "A password reset link has been sent to your email.",
  //     success: true,
  //   };
  // } else {
  //   const data = await response.json();
  //   return {
  //     message: data.message,
  //   };
  // }
}
