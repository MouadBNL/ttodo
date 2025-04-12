import { auth } from "@/server/auth";
import React from "react";

export default async function SignedOut({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    return <>{children}</>;
  }
  return null;
}
