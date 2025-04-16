"use client";
import TaskItem from "@/components/blocks/TaskItem";
import TaskList from "@/components/blocks/TaskList";
import { api } from "@/trpc/react";
import React from "react";
import { toast } from "sonner";

export default function TaskListController() {
  const utils = api.useUtils();
  const {
    data: tasks,
    error,
    isFetching,
    isLoading,
  } = api.task.getTasks.useQuery();

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
      console.log("ERR:", err.data);
    },
    onSuccess() {
      utils.task.getTasks.invalidate();
    },
  });

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
              <TaskItem task={task} key={task.id}>
                <TaskItem.Checkbox />
                <TaskItem.Details>
                  <TaskItem.Title>{task.task}</TaskItem.Title>
                  <TaskItem.DueDate dueDate={task.dueDate} />
                </TaskItem.Details>

                <TaskItem.Actions>
                  <TaskItem.ActionEdit />
                  <TaskItem.ActionDelete
                    onClick={() => deleteTask.mutateAsync({ id: task.id! })}
                  />
                </TaskItem.Actions>
              </TaskItem>
            ))}
          </TaskList>
        )}
      </div>
    </div>
  );
}
