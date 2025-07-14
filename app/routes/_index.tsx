import { useRef } from "react";
import { Footer } from "~/components/footer";
import { BettingHousesSection } from "~/components/home/betting-houses-section";
import CasinoRecommendationsSection from "~/components/home/casino-recommendation-section";
import { HeroSection } from "~/components/home/hero-section";
import { LatestArticles } from "~/components/home/latest-articles";
import { LeaderboardSection } from "~/components/home/leaderboard-section";
import { userTable } from "~/db/auth-schema";
import { db } from "~/db/index.server";
// import { env } from "~/env";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/_index";

export function meta({ data }: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function loader({ context }: Route.LoaderArgs) {
	try {
		// Fetch users from the database
		const users = await db(
			"postgresql://postgres:newsspend@localhost:5432/todo-rojo",
		)
			.select()
			.from(userTable);

		// Log for debugging (avoid in production if possible)
		console.log(users);

		// Return JSON response
		return {
			message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
			users,
		};
	} catch (error) {
		console.error("Database query failed:", error);
		return {
			message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
			error: "Failed to fetch users",
		};
	}
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const scrollToRef = useRef<HTMLDivElement | null>(null);
	return (
		<div className="min-h-svh">
			<HeroSection ref={scrollToRef} />

			<LeaderboardSection />

			<BettingHousesSection ref={scrollToRef} />

			<CasinoRecommendationsSection />

			<LatestArticles />

			<Footer />
		</div>
	);
}
