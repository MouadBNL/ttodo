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
import { api } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import { EllipsisIcon, ExpandIcon, MenuIcon, PlusIcon } from "lucide-react";
import ProjectCreateModal from "@/components/blocks/ProjectCreateModal";
import Link from "next/link";
import ProjectItem from "./ProjectItem";
import { AppSidebarProjects } from "./app-sidebar-projects";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const projects = await api.project.list();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex h-16 items-center justify-center border-b px-4">
        <h1 className="text-2xl font-bold">TTodo</h1>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0] as string}
        />
        <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent className="py-8">
        <AppSiderbarStatic />

        <AppSidebarProjects />

        {/* {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))} */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
