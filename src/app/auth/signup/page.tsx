"use client";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignUp() {
  const router = useRouter();

  const signup = api.auth.signUp.useMutation({
    onSuccess: (data) => {
      router.push("/auth/signin");
    },
    onError: (error) => {
      console.error("Error signing up", error);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const confirmPassword = formData.get("confirm-password");
    const email = formData.get("email");
    const password = formData.get("password");

    await signup.mutateAsync({
      name: name as string,
      email: email as string,
      password: password as string,
      confirmPassword: confirmPassword as string,
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
