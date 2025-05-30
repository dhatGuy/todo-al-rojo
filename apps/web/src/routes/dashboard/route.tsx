import { SidebarProvider, SidebarTrigger } from "@repo/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SidebarProvider>
        {/* <AppSidebar /> */}
        <SidebarTrigger />
        {/* <SidebarInset className="flex flex-col min-w-0">
          <main>
            <Outlet />
          </main>
        </SidebarInset> */}
      </SidebarProvider>
    </div>
  );
}
