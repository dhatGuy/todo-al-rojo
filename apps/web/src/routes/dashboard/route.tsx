import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "src/components/footer";
import { AppSidebar } from "../../components/app-sidebar";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-[#141A2D]">
          {/* <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-lg">Pulse Admin</h1>
          </div>
        </header> */}
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
