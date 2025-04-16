import type { ITask } from "@/validators";
import React, { type PropsWithChildren } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { EditIcon, XIcon } from "lucide-react";

export type TaskListProps = PropsWithChildren;

export default function TaskList({ children }: TaskListProps) {
  return <div className="grid grid-cols-1 gap-2">{children}</div>;
}
