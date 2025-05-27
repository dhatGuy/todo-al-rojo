import { Button } from "@repo/ui/button";
import bgHero from "../../assets/images/hero-bg.png";

import { Header } from "./header";

export const HeroSection = () => {
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
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-16">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="mb-6 text-4xl leading-tight font-bold text-white md:text-6xl lg:text-7xl">
              ¡Mejores programas de afiliados de
              <br />
              <span className="text-yellow-300">casinos para todos!</span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mb-8 max-w-4xl text-lg leading-relaxed text-gray-200 md:text-xl">
              Descubre promociones exclusivas, plataformas de confianza
              <br />y reseñas de expertos - ¡todo en un solo lugar!
            </p>

            {/* CTA Button */}
            <Button className="rounded-full bg-yellow-400 px-8 py-4 text-lg font-bold text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-yellow-300">
              Ver casinos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
