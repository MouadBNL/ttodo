"use client";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import AppSiderbarStatic from "./app-sidebar-static";
import { Button } from "@/components/ui/button";
import { EllipsisIcon, ExpandIcon, MenuIcon, PlusIcon } from "lucide-react";
import ProjectCreateModal from "@/components/blocks/ProjectCreateModal";
import Link from "next/link";
import ProjectItem from "./ProjectItem";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export function AppSidebarProjects() {
  const utils = api.useUtils();
  const { data: projects, isLoading } = api.project.list.useQuery();
  const deleteProject = api.project.delete.useMutation({
    onMutate: async (input) => {
      utils.project.list.cancel();
      const prev = structuredClone(utils.project.list.getData());
      utils.project.list.setData(undefined, (old) => {
        return old?.filter((e) => e.id != input.id);
      });
      return { prev };
    },
    onError(err, _, ctx) {
      utils.project.list.setData(undefined, ctx?.prev);
      toast.error("Error deleting project");
    },
    onSuccess(_, input) {
      utils.project.list.invalidate();
      if (window.location.href.includes(`projects/${input.id}`)) {
        window.location.replace("/u/inbox");
      }
    },
  });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <div className="flex w-full items-center justify-between">
          <span>Projects</span>
          <ProjectCreateModal>
            <Button size="xs" variant="ghost">
              <PlusIcon />
            </Button>
          </ProjectCreateModal>
        </div>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        {isLoading && <span>Loading...</span>}
        <SidebarMenu>
          {projects &&
            projects.map((project) => (
              <ProjectItem
                project={project}
                key={project.id}
                onDelete={(id) => deleteProject.mutate({ id })}
              />
            ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
