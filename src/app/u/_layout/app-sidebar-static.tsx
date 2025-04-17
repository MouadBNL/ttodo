"use client";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

export default function AppSiderbarStatic() {
  const path = usePathname();
  const nav = {
    items: [
      {
        title: "Dashboard",
        url: "/u",
      },
      {
        title: "Inbox", 
        url: "/u/inbox",
      },
    ].map((item) => ({
      ...item,
      isActive: path === item.url,
    })),
  };
  return (
    <SidebarMenu>
      {nav.items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.isActive}>
            <a href={item.url}>{item.title}</a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
