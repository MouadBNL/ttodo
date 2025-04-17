import { api } from "@/trpc/server";
import React from "react";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await api.project.show({ id });
  return <div>ProjectPage: {project.name} </div>;
}
