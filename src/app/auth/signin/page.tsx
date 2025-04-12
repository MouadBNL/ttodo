"use client";
import React from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    // Handle sign-in logic here
    await signIn("credentials", {
      email: email as string,
      password: password as string,
      redirect: true,
      redirectTo: "/",
    });
  };  
  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
