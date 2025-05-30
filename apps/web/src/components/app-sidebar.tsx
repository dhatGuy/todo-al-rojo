import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/sidebar";

import { Home, ListTodo, LogOut } from "lucide-react";
import PokerChip from "../assets/icons/poker-chip";
import { Ranking } from "../assets/icons/ranking";

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Task",
    url: "#",
    icon: ListTodo,
  },
  {
    title: "Shop",
    url: "#",
    icon: PokerChip,
  },
  {
    title: "Leaderboard",
    url: "#",
    icon: Ranking,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-black">
      <SidebarHeader className="p-3 sm:p-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-6 w-6 sm:h-8 sm:w-8 rounded bg-red-600 flex items-center justify-center flex-shrink-0"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    // isActive={item.isActive}
                    className="text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:bg-red-600 data-[active=true]:text-white"
                  >
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3 sm:p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-400 hover:text-red-300 hover:bg-gray-800">
              <LogOut className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
