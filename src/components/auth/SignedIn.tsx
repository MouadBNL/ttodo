import { auth } from "@/server/auth";
import React from "react";

export default async function SignedIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return <>{children}</>;
}
