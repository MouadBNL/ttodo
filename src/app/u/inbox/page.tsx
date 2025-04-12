import TaskForm from "@/components/blocks/TaskForm";
import { H1 } from "@/components/ui/typography";
import React from "react";

export default function InboxPage() {
  return (
    <div>
      <H1>Inbox</H1>

      <div className="my-8">
        <TaskForm />
      </div>
    </div>
  );
}
