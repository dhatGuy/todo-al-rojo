import { useRef } from "react";
import { getAuth } from "~/auth";
import { Footer } from "~/components/footer";
import { BettingHousesSection } from "~/components/home/betting-houses-section";
import CasinoRecommendationsSection from "~/components/home/casino-recommendation-section";
import { HeroSection } from "~/components/home/hero-section";
import { LatestArticles } from "~/components/home/latest-articles";
import { LeaderboardSection } from "~/components/home/leaderboard-section";
import type { Route } from "./+types/_index";

export function meta({ data }: Route.MetaArgs) {
	return [
		{ title: "Todo al-Rojo" },
		{ name: "description", content: "Welcome!" },
	];
}

export async function loader({ context, request }: Route.LoaderArgs) {
	const auth = getAuth(context);
	const session = await auth.api.getSession({ headers: request.headers });
	return session;
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
