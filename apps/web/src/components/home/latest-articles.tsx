import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/carousel";
import { Link } from "@tanstack/react-router";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

export const LatestArticles = () => {
  return (
    <div className="bg-gray-200">
      <div className="mx-auto max-w-7xl flex-1 py-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl md:text-4xl font-black text-gray-900">
            Últimos Artículos
          </h2>
          <p className="text-gray-700">
            Descubre nuestros últimos artículos y novedades.
          </p>
        </div>

        <div className="w-full mx-auto">
          <Carousel
            opts={{
              skipSnaps: true,
              // align: "start",
            }}
            plugins={[WheelGesturesPlugin()]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 px-4">
              {articles.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 h-full md:pl-4 basis-[85%] sm:basis-[60%] md:basis-1/2 lg:basis-1/3 flex hover:scale-105 transition-all duration-300"
                >
                  {/* @ts-expect-error */}
                  <Link to={`/articles/${item.slug}`} className="w-full">
                    <Card
                      key={index}
                      className="transform overflow-hidden rounded-xl bg-[#000014] shadow-lg transition-transform duration-300 hover:shadow-xl h-full w-full flex flex-col"
                    >
                      <CardContent className="relative aspect-square h-40 overflow-hidden rounded-xl flex-shrink-0">
                        <img
                          src={`https://picsum.photos/seed/${index}/300/200`}
                          alt="Tablet mostrando juegos de casino online"
                          className="h-full w-full rounded-xl object-cover"
                        />
                      </CardContent>
                      <CardHeader className="flex-1 flex flex-col">
                        <CardTitle className="mb-2 text-xl font-bold text-white line-clamp-2">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="mb-3 text-sm text-gray-300 line-clamp-2 flex-1 wrap-break-word hyphens-auto">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-5 md:left-10 flex bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl" />
            <CarouselNext className="right-5 md:right-10 flex bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

const articles = [
  {
    title: "¿Por Qué Elegir Buenos Proveedores...?",
    slug: "por-que-elegir-buenos-proveedores",
    description:
      "Un proveedor confiable transforma tu experiencia: sin estrés, sin fraudes, pura diversión.",
  },
  {
    title: "Los Mejores Casinos Online en Chile en 2025",
    slug: "los-mejores-casinos-online-en-chile-en-2025",
    description:
      "Conoce las plataformas top para jugar desde Chile en 2025 con grandes bonos y soporte confiable.",
  },
  {
    title: "¿Cómo Elegir el Mejor Casino Online en Chile?",
    slug: "como-elegir-el-mejor-casino-online-en-chile",
    description:
      "Aprende qué factores son clave al momento de elegir un casino seguro, justo y completo en Chile.",
  },
  {
    title: "Bonos de Bienvenida en Casinos Online en Chile",
    slug: "bonos-de-bienvenida-en-casinos-online-en-chile",
    description:
      "Te mostramos cuáles son los bonos más generosos, cómo funcionan y qué casino los ofrece en 2025.",
  },
  {
    title: "Juegos de Casino Más Populares en Chile",
    slug: "juegos-de-casino-mas-populares-en-chile",
    description:
      "Explora los juegos más jugados: tragamonedas, ruleta, blackjack y apuestas deportivas.",
  },
];
