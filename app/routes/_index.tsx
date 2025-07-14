import { useRef } from "react";
import { Footer } from "~/components/footer";
import { BettingHousesSection } from "~/components/home/betting-houses-section";
import CasinoRecommendationsSection from "~/components/home/casino-recommendation-section";
import { HeroSection } from "~/components/home/hero-section";
import { LatestArticles } from "~/components/home/latest-articles";
import { LeaderboardSection } from "~/components/home/leaderboard-section";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/_index";

export function meta({ data }: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export function loader({ context }: Route.LoaderArgs) {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
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
