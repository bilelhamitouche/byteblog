import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { LayoutDashboard, PenLine, Tag, Users2 } from "lucide-react";
import { lusitana } from "@/lib/fonts";

export default function AdminSidebar() {
  return (
    <Sidebar className="flex flex-col gap-8 justify-evenly h-full">
      <SidebarHeader>
        <Link
          href="/"
          className={`text-xl text-center flex justify-center font-bold ${lusitana.className}`}
        >
          <img src="/favicon.svg" alt="ByteBlog logo" className="size-8" />
          <span>ByteBlog</span>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin">
                <LayoutDashboard />
                <span className="text-base">Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin/users">
                <Users2 />
                <span className="text-base">Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin/posts">
                <PenLine />
                <span className="text-base">Posts</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin/topics">
                <Tag />
                <span className="text-base">Topics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
