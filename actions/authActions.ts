"use server";

import { createUser, getUserByEmail } from "@/lib/user";
import { authFormSchema } from "./actions.joi";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { redirect } from "next/navigation";
import { createAuthSession, destroySession } from "@/lib/auth";

export async function signUp(state: FormState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { error } = authFormSchema.validate({ email, password });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return { errors: errors || null };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    const id = await createUser(email, hashedPassword);
    await createAuthSession(id.toString());
    redirect("/training");
  } catch (err) {
    const currentError = err as { code: string };
    if (currentError.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return { errors: ["Email already in use"] };
    }
    throw err;
  }
}

export async function login(state: FormState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: ["Could not authenticate user, please check your credentials"],
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: ["Could not authenticate user, please check your credentials"],
    };
  }

  await createAuthSession(existingUser.id.toString());
  redirect("/training");
}

export async function auth(mode: string, state: FormState, formData: FormData) {
  if (mode === "login") {
    return login(state, formData);
  }
  return signUp(state, formData);
}

export async function logout() {
  await destroySession();
  redirect("/");
}
