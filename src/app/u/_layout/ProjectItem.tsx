import { Button } from "@/components/ui/button";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { IProject } from "@/validators";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export type ProjectItemProps = {
  project: IProject;
  onDelete?: (id: string) => void;
};
export default function ProjectItem({ project, onDelete }: ProjectItemProps) {
  return (
    <SidebarMenuItem key={project.id}>
      <div className="group/project-item relative">
        <SidebarMenuButton asChild>
          <Link href={`/u/projects/${project.id}`}>{project.name}</Link>
        </SidebarMenuButton>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-0 group-hover/project-item:opacity-100 group-[&:has([aria-expanded=true])]/project-item:opacity-1000">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="xs" variant="ghost">
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onDelete?.(project.id!)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </SidebarMenuItem>
  );
}
