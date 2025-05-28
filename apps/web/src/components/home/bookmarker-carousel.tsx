import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@repo/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

const casinos = [
  {
    name: "Betsson",
    description:
      "Betsson ofrece apuestas, tragamonedas y juegos en vivo con calidad y grandes recompensas.",
  },
  {
    name: "Pinup",
    description:
      "Pinup combina apuestas deportivas y casino en una sola plataforma con diseño atractivo y promociones constantes",
  },
  {
    name: "Thunderpick",
    description:
      "Criptomonedas, apuestas deportivas y eSports en una plataforma segura, rápida y pensada para jugadores modernos.",
  },
];

export function BookmarkerCarousel() {
  const autoScroll = AutoScroll({
    speed: 1,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Carousel
        opts={{
          align: "center",
          loop: true,
          slidesToScroll: 1,
          breakpoints: {
            "(min-width: 768px)": {
              slidesToScroll: 2,
            },
            "(min-width: 1024px)": {
              slidesToScroll: 3,
            },
          },
        }}
        plugins={[autoScroll]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {casinos.map((casino, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="rounded-xl bg-white text-black shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {casino.name}
                  </CardTitle>
                  <CardDescription className="text-gray-900">
                    {casino.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="hidden sm:flex -left-12 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl" />
        <CarouselNext className="hidden sm:flex -right-12 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl" /> */}
      </Carousel>
    </div>
  );
}
