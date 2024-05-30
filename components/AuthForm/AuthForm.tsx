"use client";

import { auth, signUp } from "@/actions/authActions";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function AuthForm({ mode }: Props) {
  const [formState, formAction] = useFormState<FormState, FormData>(
    auth.bind(null, mode),
    {
      errors: null,
    }
  );

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState?.errors && (
        <ul id="form-errors">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">{mode == "login" ? "Login" : "Sign Up"}</button>
      </p>
      <p>
        {mode == "login" && (
          <Link href="/?mode=signup">Create an account.</Link>
        )}
        {mode == "signup" && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}

type Props = {
  mode: string;
};
