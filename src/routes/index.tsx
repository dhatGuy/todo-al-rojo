import { Footer } from "@/components/footer";
import { BettingHousesSection } from "@/components/home/betting-houses-section";
import CasinoRecommendationsSection from "@/components/home/casino-recommendation-section";
import { HeroSection } from "@/components/home/hero-section";
import { LatestArticles } from "@/components/home/latest-articles";
import { LeaderboardSection } from "@/components/home/leaderboard-section";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
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
