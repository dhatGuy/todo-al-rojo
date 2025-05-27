import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import { Quote } from "lucide-react";

// Casino data
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

// Testimonial data
const testimonials = [
  {
    quote: "¡Servicio muy bueno y confiable, a cualquier hora y cualquier día!",
    name: "Juan Cruz",
    image: "https://avatar.iran.liara.run/public",
  },
  {
    quote: '"Excelente opción, altamente recomendable."',
    name: "Jorge Santisteban",
    image: "https://avatar.iran.liara.run/public",
  },
  {
    quote: "¡Muy buena experiencia! ¡Muchas graaaaacias!",
    name: "Diego Ramírez",
    image: "https://avatar.iran.liara.run/public",
  },
];

const CasinoRecommendationsSection = () => {
  return (
    <section className="bg-gray-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-4xl font-bold text-[#fefe48] md:text-5xl">
          Descubre las Mejores Casas de Apuestas
        </h2>

        <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {casinos.map((casino, index) => (
            <Card key={index} className="rounded-xl bg-white text-black">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {casino.name}
                </CardTitle>
                <CardDescription className="text-gray-900">
                  {casino.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <h2 className="mb-12 text-center text-4xl font-bold text-[#fefe48] md:text-5xl">
          Historias Todo al Rojo
        </h2>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative rounded-xl bg-[#353446] p-6">
              <div className="absolute -top-6 -left-2 rotate-180 text-white">
                <Quote size={48} fill="white" />
              </div>
              <CardContent>
                <div className="flex flex-col items-center">
                  <Avatar className="mr-4 h-12 w-12">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="mt-4 mb-2 text-center text-gray-300 italic">
                    {testimonial.quote}
                  </p>
                  <span className="font-bold">{testimonial.name}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasinoRecommendationsSection;
