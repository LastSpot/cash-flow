"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  NotebookText,
  Building,
  Building2,
} from "lucide-react";

import { NavMain } from "@/components/Dashboard/nav-main";
import { NavProjects } from "@/components/Dashboard/nav-projects";
import { NavUser } from "@/components/Dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { signout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Booking",
      url: "/dashboard/booking",
      icon: NotebookText,
    },
    {
      title: "Members",
      url: "/dashboard/members",
      icon: Building,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <Button onClick={async () => await signout()}>Signout</Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
