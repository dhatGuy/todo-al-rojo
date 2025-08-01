import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const session = context.session;
    if (session) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
