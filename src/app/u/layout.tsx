import { AppSidebar } from "./_layout/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type React from "react";
import UserButton from "@/components/auth/UserButton";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Please sign in to access this page
        </h1>
      </div>
    );
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center justify-between border-b px-4">
          <div className="flex h-16 shrink-0 items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <UserButton />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-16">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
