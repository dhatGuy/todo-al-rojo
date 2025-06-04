import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { Link } from "@tanstack/react-router";
import { Home, ListTodo } from "lucide-react";
import PokerChip from "../assets/icons/poker-chip";
import { Ranking } from "../assets/icons/ranking";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <img
          src="/todoalrojo-logo.png"
          alt="Logo"
          className="object-contain w-40 h-24 pl-8"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="" key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="[&>svg]:size-8 px-8 h-16 bg-dark-blue"
                    size="lg"
                  >
                    <Link
                      to={item.href}
                      activeOptions={{ exact: item.exact }}
                      activeProps={{
                        className: "font-semibold text-white !bg-[#141A2D]",
                      }}
                    >
                      {({}) => {
                        return (
                          <>
                            <item.icon
                              // color={isActive ? "#fff" : "rgb(66 67 87)"}
                              height={32}
                              width={32}
                            />
                            <span className="text-[1rem] ml-3">
                              {item.title}
                            </span>
                          </>
                        );
                      }}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    exact: true,
  },
  {
    title: "Task",
    href: "/dashboard/tasks",
    icon: ListTodo,
  },
  {
    title: "Shop",
    href: "/dashboard/shop",
    icon: PokerChip,
  },
  {
    title: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: Ranking,
  },
];
