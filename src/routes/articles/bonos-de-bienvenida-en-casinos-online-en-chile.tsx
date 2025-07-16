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
        title: "Por qué elegir buenos proveedores",
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
const casinos = [
  {
    rank: 1,
    name: "Licencia y Regulación",
    features: [
      "Asegúrate de que el casino posea una licencia válida de una autoridad reconocida como la Malta Gaming Authority (MGA) o Curazao eGaming. Esto garantiza que opera bajo estándares internacionales de seguridad y transparencia.",
    ],
    isHighlighted: false,
  },
  {
    rank: 2,
    name: "Variedad de Juegos Disponibles",
    features: [
      "Tragamonedas",
      "Ruleta",
      "Blackjack",
      "Póker",
      "Casino en vivo",
    ],
    isHighlighted: true,
  },
  {
    rank: 3,
    name: "Bonos y Promociones",
    features: [
      "Revisa los bonos de bienvenida, las promociones semanales y los programas de fidelidad. Lee siempre los términos y condiciones para evitar sorpresas.",
    ],
  },
  {
    rank: 4,
    name: "Opciones de Pago y Retiros",
    features: [
      "Depósitos y retiros en pesos chilenos (CLP)",
      "Múltiples métodos de pago como WebPay, transferencias bancarias, criptomonedas",
      "Procesos de retiro rápidos y seguros",
    ],
    isHighlighted: true,
  },
  {
    rank: 5,
    name: "Seguridad y Protección de Datos",
    features: [
      "El casino debe utilizar tecnología de cifrado SSL para proteger tu información personal y financiera.",
    ],
  },
  {
    rank: 6,
    name: "Servicio al Cliente",
    features: [
      "Un soporte eficiente y disponible 24/7 en español es fundamental para resolver cualquier inconveniente rápidamente.",
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
        <SectionHeader
          title="¿Qué es un Bono de Bienvenida?"
          emoji="💰"
          className="my-3"
          before="Un bono de bienvenida es una promoción especial que los casinos online ofrecen a los nuevos usuarios para incentivarlos a registrarse y realizar su primer depósito. Puede incluir:"
        />

        {/* Render all casino cards */}
        {casinos.map((casino) => (
          <CasinoCard
            key={casino.rank}
            rank={casino.rank}
            name={casino.name}
            features={casino.features}
            isHighlighted={casino.isHighlighted}
          />
        ))}

        {/* Special quote for Pin-Up Casino */}
        <div className="animate-on-scroll" data-animate="zoomIn"></div>
        <QuoteBox animation="zoomIn">
          <p className="text-md italic leading-relaxed text-lighter-yellow">
            Pin-Up Casino combina una estética retro vibrante con tecnología de
            última generación, ofreciendo una experiencia única para jugadores
            modernos.
          </p>
        </QuoteBox>

        <div className="flex flex-col gap-3 mb-4">
          <SectionHeader
            title="Mejores Bonos de Bienvenida en Chile (2025)"
            emoji="🌐"
          />

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
          <SectionHeader
            title="Términos y Condiciones que Debes Revisar"
            emoji="⚠️"
          />
          <FeatureList items={casinoFeatures} />
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <SectionHeader
            title="Preguntas Frecuentes sobre Bonos de Bienvenida"
            emoji="🔄"
          />
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
