import { getAuth } from "~/auth";
import type { Route } from "./+types/api.auth.$";

export async function loader({ context, request }: Route.LoaderArgs) {
	const auth = getAuth(context);
	return auth.handler(request);
}

export async function action({ context, request }: Route.ActionArgs) {
	const auth = getAuth(context);
	return auth.handler(request);
}
