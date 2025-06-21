import { Button } from "@repo/ui/components/button";
import bgHero from "../../assets/images/hero-bg.png";
import { Header } from "../header";

export const HeroSection = ({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <section className="flex min-h-screen flex-col overflow-hidden">
      <Header />

      {/* Radial gradient overlay to improve text readability */}
      {/* <div className='bg-gradient-radial absolute inset-0 z-0 from-transparent via-red-900/20 to-red-900/70'></div> */}

      <div className="relative h-full flex-1">
        <div
          className="absolute inset-0 bottom-0 z-0 bg-contain bg-center"
          style={{
            backgroundImage: `url(${bgHero})`,
            backgroundSize: "cover",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-5 md:pt-10 pb-16">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="mb-2 md:leading-12 font-bold text-white text-xl md:text-4xl">
              ¡Mejores programas de afiliados de
              <br />
              <span className="">casinos para todos!</span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mb-4 max-w-4xl text-md leading-tight text-gray-200 md:text-xl">
              Descubre promociones exclusivas, plataformas de confianza
              <br />y reseñas de expertos - ¡todo en un solo lugar!
            </p>

            {/* CTA Button */}
            <Button
              className="rounded-xl bg-gradient-to-br from-[#D77921] to-[#FFF154] px-4 py-4 text-lg font-bold text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-yellow-300"
              onClick={() =>
                ref.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Ver casinos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
