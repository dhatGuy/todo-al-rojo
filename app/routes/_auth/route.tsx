import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
	// beforeLoad: async () => {
	//   const { data } = await authClient.getSession();

	//   if (data?.session) {
	//     throw redirect({
	//       to: "/dashboard",
	//     });
	//   }
	// },
});

function RouteComponent() {
	return <Outlet />;
}
