"use client";
import TaskForm from "@/components/blocks/TaskForm";
import TaskItem from "@/components/blocks/TaskItem";
import TaskList from "@/components/blocks/TaskList";
import { api } from "@/trpc/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TaskListController() {
  const utils = api.useUtils();
  const { data: tasks, isLoading } = api.task.getTasks.useQuery();

  const deleteTask = api.task.delete.useMutation({
    onMutate: async ({ id }) => {
      await utils.task.getTasks.cancel();
      const prevData = utils.task.getTasks.getData();
      utils.task.getTasks.setData(undefined, (old) =>
        old?.filter((e) => e.id != id),
      );
      return { prevData };
    },

    onError(err, newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.task.getTasks.setData(undefined, ctx?.prevData);
      toast.error("Could not delete task");
    },
    onSuccess() {
      utils.task.getTasks.invalidate();
    },
  });

  const updateTask = api.task.updateTask.useMutation({
    onMutate: async (task) => {
      await utils.task.getTasks.cancel();
      const prevData = structuredClone(utils.task.getTasks.getData());
      utils.task.getTasks.setData(undefined, (old) => {
        if (!old) return;
        let i = old.findIndex((e) => e.id == task.id);
        old[i] = task;
        return old;
      });
      return { prevData };
    },
    onSuccess() {
      utils.task.getTasks.invalidate();
      setEditable(null);
    },
    onError(err, updatedTask, ctx) {
      utils.task.getTasks.setData(undefined, ctx?.prevData);
      toast.error("Could not update task");
    },
  });

  const markAsDone = api.task.markAsDone.useMutation({
    onMutate: async (task) => {
      await utils.task.getTasks.cancel();
      const prevData = structuredClone(utils.task.getTasks.getData());
      utils.task.getTasks.setData(undefined, (old) => {
        if (!old) return;
        return old.map((e) => {
          if (e.id == task.id) {
            e.completedAt = task.done ? new Date() : null;
          }
          return e;
        });
      });
      return { prevData };
    },
    onSuccess() {
      utils.task.getTasks.invalidate();
    },
    onError(err, updatedTask, ctx) {
      utils.task.getTasks.setData(undefined, ctx?.prevData);
      toast.error("Could not update task");
    },
  });

  const [editable, setEditable] = useState<number | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 gap-2">
        {isLoading && (
          <>
            <div className="h-12 animate-pulse rounded-md bg-gray-100 p-4"></div>
            <div className="h-12 animate-pulse rounded-md bg-gray-100 p-4"></div>
            <div className="h-12 animate-pulse rounded-md bg-gray-100 p-4"></div>
          </>
        )}
        {tasks && (
          <TaskList>
            {tasks.map((task) => (
              <div key={task.id}>
                {editable == task.id ? (
                  <div className="w-full rounded-lg border p-4">
                    <TaskForm
                      task={task}
                      onSubmit={updateTask.mutateAsync}
                      onCancel={() => setEditable(null)}
                    />
                  </div>
                ) : (
                  <TaskItem task={task}>
                    <>
                      <TaskItem.Checkbox
                        value={!!task.completedAt}
                        onChange={(done) =>
                          markAsDone.mutate({ id: task.id!, done: done })
                        }
                      />
                      <TaskItem.Details>
                        <TaskItem.Title>{task.task}</TaskItem.Title>
                        <TaskItem.DueDate dueDate={task.dueDate} />
                      </TaskItem.Details>

                      <TaskItem.Actions>
                        <TaskItem.ActionEdit
                          onClick={() => setEditable(task.id!)}
                        />
                        <TaskItem.ActionDelete
                          onClick={() =>
                            deleteTask.mutateAsync({ id: task.id! })
                          }
                        />
                      </TaskItem.Actions>
                    </>
                  </TaskItem>
                )}
              </div>
            ))}
          </TaskList>
        )}
      </div>
    </div>
  );
}
