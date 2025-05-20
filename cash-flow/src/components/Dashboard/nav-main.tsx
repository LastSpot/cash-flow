"use client";

import {
  LayoutDashboardIcon,
  NotebookText,
  ChevronRight,
  // Building,
  // Settings2,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {/* Dashboard */}
          <Link href="/dashboard">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Dashboard">
                <LayoutDashboardIcon />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
          {/* Booking */}
          <Collapsible
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Booking">
                  <NotebookText />
                  <span>Booking</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {/* Revenue */}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/dashboard/revenue">
                        <span>Revenue</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  {/* Expense */}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/dashboard/expense">
                        <span>Expense</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  {/* Assets */}
                  {/* <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/dashboard/assets">
                        <span>Assets</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem> */}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          {/* Members */}
          {/* <Link href="/dashboard/members">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Members">
                <Building />
                <span>Members</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link> */}
          {/* Settings */}
          {/* <Link href="/dashboard/settings">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings2 />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link> */}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
