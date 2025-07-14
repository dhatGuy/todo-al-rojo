import { createRequestHandler } from "react-router";
import { getLoadContext } from "~/load-context";

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: Env;
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	async fetch(request, env, ctx) {
		const loadContext = getLoadContext({
			request,
			context: {
				cloudflare: {
					cf: request.cf,
					ctx: {
						props: ctx.props?.bind?.(ctx),
						waitUntil: ctx.waitUntil.bind(ctx),
						passThroughOnException: ctx.passThroughOnException.bind(ctx),
					},
					caches,
					env,
				},
			},
		});

		return await requestHandler(request, loadContext);
	},
} satisfies ExportedHandler<Env>;
