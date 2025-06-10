import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authClient } from "src/utils/auth-client";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data } = await authClient.getSession();

    if (data?.session) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
