import type { ITask } from "@/validators";
import React, { type PropsWithChildren } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { EditIcon, XIcon } from "lucide-react";

export default function TaskItem({
  children,
  task,
}: React.PropsWithChildren<{
  task: ITask;
}>) {
  return (
    <div className="group peer flex gap-4 rounded-md p-2 transition-colors duration-200 ease-in-out hover:bg-gray-50">
      {children}
    </div>
  );
}

type TaskItemCheckbox = {
  value?: boolean;
  onChange?: (value: boolean) => void;
};
TaskItem.Checkbox = function TaskItemCheckbox({
  value,
  onChange,
}: TaskItemCheckbox) {
  return (
    <div className="pt-1">
      <Checkbox checked={value} onCheckedChange={onChange} />
    </div>
  );
};

TaskItem.Details = function TaskItemDetails({ children }: PropsWithChildren) {
  return <div>{children}</div>;
};

TaskItem.Title = function TaskItemTitle({ children }: PropsWithChildren) {
  return (
    <p className="text-sm font-medium text-gray-700 group-hover:underline">
      {children}
    </p>
  );
};

TaskItem.DueDate = function TaskItemDueDate({ dueDate }: { dueDate: Date }) {
  return (
    <p className="text-gray-5 00 text-xs font-light">
      {dueDate.toDateString()}
    </p>
  );
};

TaskItem.Actions = function TaskItemActions({ children }: PropsWithChildren) {
  return (
    <div className="ml-auto hidden gap-2 pt-1 group-hover:flex">{children}</div>
  );
};

TaskItem.ActionDelete = function ActionDelete({
  onClick,
}: {
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      size="xs"
      variant="ghost"
      className="text-gray-500 hover:text-gray-800"
    >
      <XIcon scale={0.5} />
    </Button>
  );
};

TaskItem.ActionEdit = function ActionEdit() {
  return (
    <Button
      size="xs"
      variant="ghost"
      className="text-gray-500 hover:text-gray-800"
    >
      <EditIcon className="h-4 w-4" />
    </Button>
  );
};
