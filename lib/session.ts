"use server";

import { Role } from "@/types";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
    image?: string;
  };
  accessToken: string;
  refreshToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
if (!secretKey) {
  throw new Error("SESSION_SECRET_KEY is not set in environment variables");
}
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: Session) {
  const expiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiredAt)
    .sign(encodedKey);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  if (!cookie) return null;
  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch (err) {
    console.error("Failed to verify the session", err);
    await deleteSession();
    redirect("/auth/signin");
  }
}

export async function deleteSession() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
  } catch (err) {
    console.error("Failed to delete session", err);
    throw new Error("Could not delete session");
  }
}

export async function saveSession(updatedSession: Session) {
  try {
    await createSession(updatedSession);
  } catch (error) {
    console.error("Failed to save session:", error);
    throw new Error("Unable to save session");
  }
}
