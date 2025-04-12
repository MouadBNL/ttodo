import { auth } from "@/server/auth";
import React from "react";

export default async function UserButton() {
  const session = await auth();
  return <div>{session?.user?.name}</div>;
}
