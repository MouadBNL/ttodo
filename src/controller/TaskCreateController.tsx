"use client";

import TaskForm from "@/components/blocks/TaskForm";
import { api } from "@/trpc/react";
import type { ITask } from "@/validators";

export default function TaskCreateController({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const utils = api.useUtils();
  const createTask = api.task.addTask.useMutation({
    onSuccess: async () => {
      onCreated?.();
      utils.task.getTasks.invalidate();
    },
  });
  const onSubmit = async (data: ITask) => {
    console.log("Creating task....");
    await createTask.mutateAsync(data);
  };
  return <TaskForm onSubmit={onSubmit} onCancel={onCreated} />;
}
