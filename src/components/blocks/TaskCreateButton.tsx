"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import TaskCreateController from "@/controller/TaskCreateController";

export default function TaskCreateButton() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon />
          Create a new Task
        </Button>
      </DialogTrigger>
      <DialogContent className="top-80 lg:w-[600px] lg:max-w-[600px] xl:w-[900px] xl:max-w-[900px]">
        <DialogTitle>Create a new Task</DialogTitle>
        <TaskCreateController onCreated={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
