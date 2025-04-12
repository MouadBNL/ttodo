"use client";
import { api } from "@/trpc/react";
import React from "react";

export default function TaskListController() {
  const {
    data: tasks,
    error,
    isFetching,
    isLoading,
  } = api.task.getTasks.useQuery();
  return (
    <div>
      <div className="grid grid-cols-1 gap-2">
        {isLoading && (
          <>
            <div className="h-16 animate-pulse rounded-md bg-gray-50 p-4"></div>
            <div className="h-16 animate-pulse rounded-md bg-gray-50 p-4"></div>
            <div className="h-16 animate-pulse rounded-md bg-gray-50 p-4"></div>
          </>
        )}
        {tasks &&
          tasks.map((task) => (
            <div key={task.id} className="rounded-md border p-4">
              <p>{task.task}</p>
            </div>
          ))}

        {isFetching && (
          <div className="h-16 animate-pulse rounded-md bg-gray-50 p-4"></div>
        )}
      </div>
    </div>
  );
}
