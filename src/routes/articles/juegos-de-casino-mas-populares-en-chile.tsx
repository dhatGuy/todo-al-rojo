import {
  AnimatedSection,
  CasinoCard,
  FeatureList,
  PromoBox,
  QuoteBox,
  SectionHeader,
} from "@/components/blog-comps";
import { Header } from "@/components/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/articles/juegos-de-casino-mas-populares-en-chile",
)({
  component: RouteComponent,
  head: () => ({
    meta: [
      ...seo({
        title: "Juegos de casino más populares en Chile - TodoAlRojo",
        description: "Descubre los juegos de casino más populares en Chile.",
        keywords: "casino, chile, juegos, populares",
      }),
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
      },
    ],
  }),
});

const topCasinos = [
  {
    rank: 1,
    name: "Tragamonedas (Slots)",
    features: [
      "Las tragamonedas siguen siendo las reinas del casino. Con temáticas variadas, jackpots progresivos y bonos especiales, ofrecen entretenimiento rápido y vibrante.",
    ],
    isHighlighted: false,
    subList: [
      {
        title: "Populares en 2025",
        description: '"Gates of Olympus", "Big Bass Bonanza", "Sweet Bonanza"',
      },
      {
        title: "¿Dónde jugar?",
        description: "Pin-Up Casino, Betsson",
      },
    ],
  },
  {
    rank: 2,
    name: "Ruleta Online",
    features: [
      "Un clásico que nunca pasa de moda. Ya sea ruleta europea, americana o en vivo, la emoción de ver girar la bola sigue fascinando.",
    ],
    isHighlighted: false,
    subList: [
      {
        title: "Variantes populares",
        description: "Ruleta en vivo, Lightning Roulette",
      },
      {
        title: "¿Dónde jugar?",
        description: "LeoVegas, Betano",
      },
    ],
  },
  {
    rank: 3,
    name: "Blackjack",
    features: [
      "La mezcla perfecta de estrategia y suerte. El objetivo es claro: vencer al crupier sin pasarse de 21.",
    ],
    isHighlighted: false,
    subList: [
      {
        title: "Modalidades",
        description: "Blackjack clásico, Blackjack en vivo",
      },
      {
        title: "¿Dónde jugar?",
        description: "Pin-Up Casino, JackpotCity",
      },
    ],
  },
  {
    rank: 4,
    name: "Póker Online",
    features: [
      "Aunque más desafiante, el póker sigue ganando adeptos en Chile gracias a torneos online y mesas de cash.",
    ],
    isHighlighted: false,
    subList: [
      {
        title: "Variantes",
        description: "Texas Hold'em, Caribbean Stud Poker",
      },
      {
        title: "¿Dónde jugar?",
        description: "Betsson, Betano",
      },
    ],
  },
  {
    rank: 5,
    name: "Apuestas Deportivas",
    features: [],
    isHighlighted: false,
    before:
      "Cada vez más casinos combinan casino online y apuestas deportivas, especialmente populares en eventos como la Copa Libertadores o la NBA.",
    subList: [
      {
        title: "¿Dónde jugar?",
        description: "Betano, Pin-Up Casino",
      },
    ],
  },
];

// Data for what to look for in a casino
const casinoFeatures = [
  {
    title: "Requisitos de apuesta",
    description:
      "cuántas veces debes apostar el bono antes de retirar ganancias.",
  },
  {
    title: "Límite de tiempo",
    description: "tiempo disponible para usar el bono.",
  },
  {
    title: "Restricciones de juegos",
    description: "algunos bonos solo aplican a ciertos juegos.",
  },
];

const faqItems = [
  {
    id: "item-1",
    question: "¿Qué juego de casino paga más?",
    answer:
      "Generalmente, el blackjack y algunas tragamonedas de jackpot progresivo tienen mejores retornos.",
  },
  {
    id: "item-2",
    question: "¿Puedo jugar gratis antes de apostar dinero real?",
    answer:
      "Sí, muchos casinos ofrecen versiones demo de sus juegos para practicar sin riesgo.",
  },
  {
    id: "item-3",
    question: "¿Cuál es el juego más fácil para principiantes?",
    answer:
      "Las tragamonedas son ideales para quienes recién comienzan, ya que no requieren experiencia ni estrategia.",
  },
];

const consejosDeJuego = [
  {
    description:
      "Define tu estilo: Rápido y casual (slots) o estratégico (blackjack, póker)",
  },
  {
    description:
      "Consulta el RTP:El porcentaje de retorno al jugador varía entre juegos",
  },
  {
    description:
      "Aprovecha los bonos: Muchos casinos ofrecen promociones especiales para ciertos juegos",
  },
];

function RouteComponent() {
  return (
    <main
      className="flex flex-col bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: "url('https://todoalrojo.cl/images/bg-image.png')",
      }}
    >
      <Header />
      <div
        className="bg-[#061f3f] animate-on-scroll py-2"
        data-animate="fadeInUp"
      >
        <Link
          to="/"
          className="text-lighter-yellow font-medium pl-12 hover:underline"
        >
          ← Volver al inicio
        </Link>
      </div>

      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://picsum.photos/1910/1080')" }}
        >
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>
        <AnimatedSection className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-bold text-2xl md:text-3xl leading-tight mb-4">
            Juegos de Casino Más Populares en Chile: ¿Cuáles Conquistan el 2025?
          </h1>
          <p className="text-lg md:text-xl">
            Descubre los juegos más jugados por los chilenos este año:
            tragamonedas, blackjack, ruleta y más. Te contamos dónde
            disfrutarlos con seguridad y buenos bonos.
          </p>
        </AnimatedSection>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
      </section>

      <section className="max-w-screen-md text-white mx-auto fade-in mt-18">
        <div>
          <SectionHeader
            title="🎯 Top Juegos de Casino en Chile (2025)"
            className="my-3"
          />
          {topCasinos.map((casino) => (
            <div className="flex flex-col mb-6">
              <CasinoCard
                key={casino.rank}
                rank={casino.rank}
                name={casino.name}
                features={casino.features}
                isHighlighted={false}
                className="!mb-2"
              />
              <FeatureList items={casino.subList} isHighlighted />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <SectionHeader
            title="Consejos para Elegir el Mejor Juego"
            emoji="👉"
          />
          <FeatureList items={consejosDeJuego} isHighlighted />
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <SectionHeader title="⚠️ Términos y Condiciones que Debes Revisar" />
          <FeatureList items={casinoFeatures} />
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <SectionHeader title="🔄 Preguntas Frecuentes sobre Juegos de Casino" />
          <Accordion type="multiple">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-lighter-yellow"
              >
                <AccordionTrigger className="font-bold text-lighter-yellow text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <SectionHeader title="Conclusión" emoji="📍" />
          <AnimatedSection>
            <p>
              Ya sea que prefieras la adrenalina de las tragamonedas, la
              estrategia del blackjack o la emoción de las apuestas deportivas,
              2025 trae opciones para todos los gustos en Chile.
            </p>
          </AnimatedSection>

          <PromoBox>
            ¡Explora, diviértete y elige tu favorito en plataformas confiables!
          </PromoBox>

          <QuoteBox>
            ✨ Recuerda siempre jugar de manera responsable. ✨
          </QuoteBox>
        </div>
      </section>
    </main>
  );
}
