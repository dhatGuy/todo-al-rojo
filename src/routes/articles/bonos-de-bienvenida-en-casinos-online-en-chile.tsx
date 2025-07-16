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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/articles/bonos-de-bienvenida-en-casinos-online-en-chile",
)({
  component: RouteComponent,
  head: () => ({
    meta: [
      ...seo({
        title:
          "Juegos de Casino Más Populares en Chile: ¿Cuáles Conquistan el 2025?",
        description: "Aprende por qué es importante elegir buenos proveedores",
        keywords: "proveedores, calidad, servicio",
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

// Data for casinos
const tips = [
  {
    rank: 1,
    name: "Bono de Depósito",
    features: ["El casino duplica o multiplica tu primer depósito."],
    isHighlighted: false,
  },
  {
    rank: 2,
    name: "Giros Gratis",
    features: ["Ideal para los amantes de las tragamonedas."],
    isHighlighted: false,
  },
  {
    rank: 3,
    name: "Bonos Sin Depósito",
    features: [
      "Recibes un pequeño saldo o giros gratis simplemente por registrarte.",
    ],
  },
  {
    rank: 4,
    name: "Paquetes de Bienvenida",
    features: [
      "Incluyen bonos para varios depósitos iniciales, más giros gratis.",
    ],
    isHighlighted: false,
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
    question: "¿Puedo retirar el dinero del bono inmediatamente?",
    answer:
      "No, primero debes cumplir los requisitos de apuesta que impone cada casino.",
  },
  {
    id: "item-2",
    question: "¿Vale la pena aceptar un bono de bienvenida?",
    answer:
      "Sí, siempre que revises las condiciones y elijas casinos confiables con requisitos justos.",
  },
  {
    id: "item-3",
    question: "¿Qué casino ofrece el mejor bono en 2025?",
    answer:
      "Pin-Up Casino destaca por su bono generoso y sus bajos requisitos de apuesta.",
  },
];

const welcomeBonuses2025 = [
  {
    casino: "Pin-Up Casino",
    bonus: "100% hasta $250.000 CLP + 250 giros",
    requisitos: "Depósito mínimo $10.000 CLP",
  },
  {
    casino: "Betsson",
    bonus: "100% hasta $200.000 CLP",
    requisitos: "Depósito mínimo $10.000 CLP",
  },
  {
    casino: "Betano",
    bonus: "100% hasta $100.000 CLP + apuestas gratis",
    requisitos: "Depósito mínimo $5.000 CLP",
  },
  {
    casino: "LeoVegas",
    bonus: "Hasta $150.000 CLP + 20 giros",
    requisitos: "Depósito mínimo $10.000 CLP",
  },
  {
    casino: "JackpotCity",
    bonus: "100% hasta $160.000 CLP",
    requisitos: "Depósito mínimo $10.000 CLP",
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
            Bonos de Bienvenida en Casinos Online en Chile [Comparativa 2025]
          </h1>
          <p className="text-lg md:text-xl">
            En Chile, los bonos de bienvenida son una excelente forma de
            comenzar tu experiencia. Te mostramos los tipos de bonos, cómo
            funcionan y cuáles son los mejores en 2025.
          </p>
        </AnimatedSection>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
      </section>

      <section className="max-w-screen-md text-white mx-auto fade-in mt-18">
        <div>
          <SectionHeader
            title="💰¿Qué es un Bono de Bienvenida?"
            className="my-3"
          />
          <p>
            Un bono de bienvenida es una promoción especial que los casinos
            online ofrecen a los nuevos usuarios para incentivarlos a
            registrarse y realizar su primer depósito. Puede incluir:
          </p>
          <CasinoCard
            // rank={casino.rank}
            // name={casino.name}
            features={[
              "Dinero extra para jugar",
              "Giros gratis en tragamonedas",
              "Bonificaciones combinadas (dinero + giros)",
            ]}
            isHighlighted
          />
        </div>

        {/* Special quote for Pin-Up Casino */}
        <div
          className="animate-on-scroll flex flex-col gap-3"
          data-animate="zoomIn"
        >
          <SectionHeader title="📊 Tipos de Bonos de Bienvenida" />
          <div>
            {tips.map((tip) => (
              <CasinoCard
                key={tip.rank}
                rank={tip.rank}
                name={tip.name}
                features={tip.features}
                isHighlighted={false}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <SectionHeader title="🌐 Mejores Bonos de Bienvenida en Chile (2025)" />

          <Table className="rounded-2xl">
            <TableHeader className="bg-red-700">
              <TableRow>
                <TableHead className="text-white font-bold">Casino</TableHead>
                <TableHead className="text-white font-bold">Bono</TableHead>
                <TableHead className="text-white font-bold">
                  Requisitos
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {welcomeBonuses2025.map((item) => (
                <TableRow key={item.casino}>
                  <TableCell className="font-medium">{item.casino}</TableCell>
                  <TableCell>{item.bonus}</TableCell>
                  <TableCell>{item.requisitos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <SectionHeader title="⚠️ Términos y Condiciones que Debes Revisar" />
          <FeatureList items={casinoFeatures} />
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <SectionHeader title="🔄 Preguntas Frecuentes sobre Bonos de Bienvenida" />
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
              Un buen bono de bienvenida puede marcar la diferencia. Revisa
              siempre los términos.
            </p>
          </AnimatedSection>

          <PromoBox>¡Aprovecha al máximo tu primera apuesta en 2025!</PromoBox>

          <QuoteBox>✨ Juega de manera responsable y disfruta. ✨</QuoteBox>
        </div>
      </section>
    </main>
  );
}
