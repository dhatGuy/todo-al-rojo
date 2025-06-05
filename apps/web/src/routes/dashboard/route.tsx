import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@repo/ui/components/sidebar";
import { cn } from "@repo/ui/lib/utils";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import DashboardNavigation from "src/components/dashboard-header";
import { Footer } from "src/components/footer";
import { AppSidebar } from "../../components/app-sidebar";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
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
  console.log(sidebarState);

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
