import DashboardNavigation from "@/components/dashboard-header";
import { Footer } from "@/components/footer";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { getUser } from "@/lib/auth.server";
import { cn } from "@/lib/utils";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "../../components/app-sidebar";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  loader: async () => {
    const session = await getUser();

    if (!session?.user) {
      throw redirect({
        to: "/signin",
      });
    }

    return session;
  },
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#141A2D]">
        <Header />
        <Content />
        <div className="sticky bottom-0 w-full">
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

const Header = () => {
  const sidebarState = useSidebar();

  return (
    <header
      className={cn("flex shrink-0 items-center gap-2 px-4 pt-4", {
        "pl-10":
          !sidebarState.isMobile &&
          (sidebarState.openMobile || sidebarState.open),
      })}
    >
      <SidebarTrigger className="-ml-1 text-gray-200" />
      <DashboardNavigation />
    </header>
  );
};

const Content = () => {
  const sidebarState = useSidebar();

  return (
    <div
      className={cn("flex flex-1 flex-col gap-4 p-4 mb-20", {
        "pl-10":
          !sidebarState.isMobile &&
          (sidebarState.openMobile || sidebarState.open),
      })}
    >
      <Outlet />
    </div>
  );
};
