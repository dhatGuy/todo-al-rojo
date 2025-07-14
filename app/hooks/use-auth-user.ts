import { useRouteLoaderData } from "react-router";
import type { loader as IndexLoader } from "~/routes/_index";

export function useAuthUser() {
	const data = useRouteLoaderData<typeof IndexLoader>("routes/_index");
	return { ...data };
}
