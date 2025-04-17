"use client";
import React, { type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ProjectCreateController from "@/controller/ProjectCreateController";
import type { IProject } from "@/validators";
import { useRouter } from "next/navigation";
export default function ProjectCreateModal({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  const onCreated = (project: IProject | undefined) => {
    if (project) {
      console.log("Redirecting...");
      window.location.replace(`/u/projects/${project.id}`);
    }
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-80 lg:w-[600px] lg:max-w-[600px] xl:w-[900px] xl:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
        </DialogHeader>
        <ProjectCreateController
          onCancel={() => setOpen(false)}
          onCreated={onCreated}
        />
      </DialogContent>
    </Dialog>
  );
}
