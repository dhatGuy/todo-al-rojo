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
  "/articles/los-mejores-casinos-online-en-chile-en-2025",
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
    name: "Pin-Up Casino",
    features: [
      "Variedad de juegos: tragamonedas, ruleta, blackjack, póker y apuestas deportivas.",
      "Bonos atractivos: bono de bienvenida generoso y promociones semanales.",
      "Seguridad: licencias internacionales y protocolos de cifrado avanzados.",
      "Móvil friendly: sitio y app adaptados perfectamente para jugar desde cualquier dispositivo.",
    ],
    isHighlighted: true,
  },
  {
    rank: 2,
    name: "Betsson",
    features: [
      "Excelente selección de juegos.",
      "Promociones regulares y apuestas deportivas.",
      "Plataforma segura y fácil de usar.",
    ],
  },
  {
    rank: 3,
    name: "Betano",
    features: [
      "Bonos de bienvenida atractivos.",
      "Transmisión de eventos deportivos en vivo.",
      "Aplicación móvil de alta calidad.",
    ],
  },
  {
    rank: 4,
    name: "LeoVegas",
    features: [
      "Gran variedad de juegos optimizados para dispositivos móviles.",
      "Promociones exclusivas para jugadores chilenos.",
      "Retiro de fondos rápido y seguro.",
    ],
  },
  {
    rank: 5,
    name: "JackpotCity",
    features: [
      "Especialista en tragamonedas progresivas.",
      "Licencia de la MGA (Malta Gaming Authority).",
      "Servicio al cliente disponible 24/7.",
    ],
  },
];

// Data for what to look for in a casino
const casinoFeatures = [
  {
    title: "Licencia y regulación",
    description:
      "Asegúrate de que el casino esté licenciado por autoridades reconocidas.",
  },
  {
    title: "Métodos de pago",
    description:
      "Busca opciones locales como WebPay, transferencias bancarias y criptomonedas.",
  },
  {
    title: "Variedad de juegos",
    description: "Desde tragamonedas hasta casino en vivo.",
  },
  {
    title: "Bonificaciones y promociones",
    description: "Lee siempre los términos y condiciones.",
  },
  {
    title: "Soporte al cliente",
    description: "24/7 y en español es lo ideal.",
  },
];

// FAQ data
const faqItems = [
  {
    id: "item-1",
    question: "¿Es legal jugar en casinos online en Chile?",
    answer:
      "Sí, los jugadores chilenos pueden jugar en casinos internacionales que acepten jugadores de Chile.",
  },
  {
    id: "item-2",
    question: "¿Cuál es el mejor casino online para bonos de bienvenida?",
    answer:
      "Pin-Up Casino y Betsson ofrecen algunos de los bonos más atractivos del mercado.",
  },
  {
    id: "item-3",
    question: "¿Puedo depositar en pesos chilenos (CLP)?",
    answer:
      "Muchos casinos permiten depositar directamente en CLP o usan conversores automáticos.",
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
            Los Mejores Casinos Online en Chile en 2025: ¡Diversión y Seguridad
            Garantizadas!
          </h1>
          <p className="text-lg md:text-xl">
            Encontrar un casino online confiable y entretenido en Chile puede
            ser todo un desafío. En este artículo, te presentamos los mejores
            casinos online para jugadores chilenos en 2025, destacando a Pin-Up
            Casino.
          </p>
        </AnimatedSection>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
      </section>

      <section className="max-w-screen-md text-white mx-auto fade-in mt-18">
        <SectionHeader
          title="Top 5 Casinos Online en Chile"
          emoji="🌟"
          className="my-3"
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
            title="¿Qué Debes Buscar en un Casino Online en Chile?"
            emoji="🔎"
          />
          <FeatureList items={casinoFeatures} />
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <SectionHeader
            title="Preguntas Frecuentes sobre Casinos Online en Chile"
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
          <SectionHeader title="Conclusión" emoji="👉" />
          <AnimatedSection>
            <p>
              Elegir el mejor casino online en Chile depende de tus preferencias
              personales, pero si buscas un sitio confiable, seguro y con una
              experiencia de usuario sobresaliente, Pin-Up Casino debería estar
              en la parte superior de tu lista.
            </p>
          </AnimatedSection>

          <PromoBox>
            ¡Regístrate, reclama tu bono de bienvenida y comienza a disfrutar de
            la diversión que te espera!
          </PromoBox>

          <QuoteBox>
            ✨ ¡Recuerda siempre jugar de manera responsable y con moderación!
            ✨
          </QuoteBox>
        </div>
      </section>
    </main>
  );
}
