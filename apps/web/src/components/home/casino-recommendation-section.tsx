import { BookmarkerCarousel } from "./bookmarker-carousel";
import { TestimonialCarousel } from "./testimonial-carousel";

const CasinoRecommendationsSection = () => {
  return (
    <section className="bg-gray-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-24">
        <div className="flex flex-col gap-12">
          <h2 className="text-center text-4xl font-bold text-[#fefe48] md:text-5xl">
            Descubre las Mejores Casas de Apuestas
          </h2>

          <BookmarkerCarousel />
        </div>

        <div className="flex flex-col gap-12">
          <h2 className="text-center text-4xl font-bold text-[#fefe48] md:text-5xl">
            Historias Todo al Rojo
          </h2>

          {/* Testimonials */}
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
};

export default CasinoRecommendationsSection;
