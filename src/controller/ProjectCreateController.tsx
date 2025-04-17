"use client";
import ProjectForm from "@/components/blocks/ProjectForm";
import { api } from "@/trpc/react";
import type { IProject } from "@/validators";
import React from "react";

export default function ProjectCreateController({
  onCreated,
  onCancel,
}: {
  onCreated?: (data: IProject | undefined) => void;
  onCancel?: () => void;
}) {
  const utils = api.useUtils();
  const createPorject = api.project.create.useMutation({
    onSuccess: async (data) => {
      console.log({ data });
      onCreated?.(data);
      utils.project.list.invalidate();
    },
  });
  const onSubmit = async (data: IProject) => {
    await createPorject.mutateAsync(data);
  };
  return <ProjectForm onSubmit={onSubmit} onCancel={onCancel} />;
}
