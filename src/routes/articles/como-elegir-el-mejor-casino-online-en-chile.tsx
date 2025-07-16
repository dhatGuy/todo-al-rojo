import {
  AnimatedSection,
  CasinoCard,
  FeatureList,
  PromoBox,
  QuoteBox,
  SectionHeader,
} from "@/components/blog-comps";
import { Header } from "@/components/header";
import { seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/articles/como-elegir-el-mejor-casino-online-en-chile",
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
    description: "No verificar la licencia del casino.",
  },
  {
    description: "No leer los términos de los bonos.",
  },
  {
    description: "Ignorar las opiniones y reseñas de otros usuarios.",
  },
  {
    description:
      "Elegir un casino solo por el diseño sin analizar la seguridad.",
  },
  {
    description: "No revisar los métodos de retiro disponibles.",
  },
];

const checklistItems = [
  {
    description: "✅ ¿El casino está licenciado?",
  },
  {
    description: "✅ ¿Ofrece tus juegos favoritos?",
  },
  {
    description: "✅ ¿Tiene bonos claros y justos?",
  },
  {
    description: "✅ ¿Permite depositar y retirar en CLP?",
  },
  {
    description: "✅ ¿Proporciona soporte al cliente eficiente?",
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
          title="Factores Clave para Elegir un Casino Online"
          emoji="🔎"
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
            title="Errores Comunes al Elegir un Casino Online"
            emoji="🚫"
          />
          <FeatureList items={casinoFeatures} />
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <SectionHeader
            title="Checklist Rápida Antes de Registrarte"
            emoji="🔢"
          />
          <FeatureList items={checklistItems} />
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <SectionHeader title="Conclusión" emoji="👉" />
          <AnimatedSection>
            <p>
              Elegir el casino online adecuado puede marcar la diferencia entre
              una experiencia divertida y una frustración. Sigue esta guía para
              asegurarte de jugar en plataformas seguras, con buenos bonos y
              excelente soporte.
            </p>
          </AnimatedSection>

          <PromoBox>
            ¡Prepárate para disfrutar al máximo de tu experiencia de juego
            online en Chile en 2025!
          </PromoBox>

          <QuoteBox>✨ Juega siempre de manera responsable. ✨</QuoteBox>
        </div>
      </section>
    </main>
  );
}
