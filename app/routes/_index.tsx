import { useRef } from "react";
import { Footer } from "~/components/footer";
import { BettingHousesSection } from "~/components/home/betting-houses-section";
import CasinoRecommendationsSection from "~/components/home/casino-recommendation-section";
import { HeroSection } from "~/components/home/hero-section";
import { LatestArticles } from "~/components/home/latest-articles";
import { LeaderboardSection } from "~/components/home/leaderboard-section";
import { userTable } from "~/db/auth-schema";
import type { Route } from "./+types/_index";

export function meta({ data }: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function loader({ context }: Route.LoaderArgs) {
	const test = await context.db.select().from(userTable);
	console.log("🚀 ~ loader ~ test:", test);
	return {
		test,
	};
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
