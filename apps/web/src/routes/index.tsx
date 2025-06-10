import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "../components/footer";
import { BettingHousesSection } from "../components/home/betting-houses-section";
import CasinoRecommendationsSection from "../components/home/casino-recommendation-section";
import { HeroSection } from "../components/home/hero-section";
import { LatestArticles } from "../components/home/latest-articles";
import { LeaderboardSection } from "../components/home/leaderboard-section";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-svh">
      <HeroSection />

      <LeaderboardSection />

      <BettingHousesSection />

      <CasinoRecommendationsSection />

      <LatestArticles />

      <Footer />
    </div>
  );
}
