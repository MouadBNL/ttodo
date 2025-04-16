import TaskCreateButton from "@/components/blocks/TaskCreateButton";
import { H1 } from "@/components/ui/typography";
import TaskListController from "@/controller/TaskListController";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import React from "react";

export default async function InboxPage() {
  const session = await auth();

  if (session?.user) {
    void api.task.getTasks.prefetch();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <H1>Inbox</H1>
        <TaskCreateButton />
      </div>

      <div className="my-8">
        <TaskListController />
      </div>
    </div>
  );
}
