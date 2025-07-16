import { Header } from "@/components/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { seo } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "./por.css?url";

export const Route = createFileRoute(
  "/articles/por-que-elegir-buenos-proveedores",
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
      {
        rel: "stylesheet",
        href: styles,
      },
    ],
  }),
});

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
        <div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-on-scroll"
          data-animate="fadeInUp"
        >
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
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
      </section>

      <section className="max-w-screen-md text-white mx-auto fade-in mt-18">
        <h2
          className="animate-on-scroll text-lighter-yellow text-2xl font-medium my-3"
          data-animate="fadeInUp"
        >
          🌟 Top 5 Casinos Online en Chile
        </h2>

        <div className="flex flex-col gap-1 mb-4">
          <h3
            className="animate-on-scroll text-[rgb(97,218,251)]"
            data-animate="fadeInUp"
          >
            1. Pin-Up Casino
          </h3>
          <ul className="emoji-list animate-on-scroll" data-animate="fadeInUp">
            <li>
              Variedad de juegos: tragamonedas, ruleta, blackjack, póker y
              apuestas deportivas.
            </li>
            <li>
              Bonos atractivos: bono de bienvenida generoso y promociones
              semanales.
            </li>
            <li>
              Seguridad: licencias internacionales y protocolos de cifrado
              avanzados.
            </li>
            <li>
              Móvil friendly: sitio y app adaptados perfectamente para jugar
              desde cualquier dispositivo.
            </li>
          </ul>
        </div>

        <div
          className="quote-box animate-on-scroll"
          data-animate="zoomIn"
        ></div>
        <blockquote className="p-4 my-4 border-s-4 border-lighter-yellow bg-lighter-yellow/5">
          <p className="text-md italic leading-relaxed text-lighter-yellow">
            Pin-Up Casino combina una estética retro vibrante con tecnología de
            última generación, ofreciendo una experiencia única para jugadores
            modernos.
          </p>
        </blockquote>

        <div className="flex flex-col gap-1 mb-4">
          <h3
            className="animate-on-scroll text-sky-blue"
            data-animate="fadeInUp"
          >
            2. Betsson
          </h3>
          <ul className="animate-on-scroll" data-animate="fadeInUp">
            <li>Excelente selección de juegos.</li>
            <li>Promociones regulares y apuestas deportivas.</li>
            <li>Plataforma segura y fácil de usar.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <h3
            className="animate-on-scroll text-sky-blue"
            data-animate="fadeInUp"
          >
            3. Betano
          </h3>
          <ul className="animate-on-scroll" data-animate="fadeInUp">
            <li>Bonos de bienvenida atractivos.</li>
            <li>Transmisión de eventos deportivos en vivo.</li>
            <li>Aplicación móvil de alta calidad.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <h3
            className="animate-on-scroll text-sky-blue"
            data-animate="fadeInUp"
          >
            4. LeoVegas
          </h3>
          <ul className="animate-on-scroll" data-animate="fadeInUp">
            <li>
              Gran variedad de juegos optimizados para dispositivos móviles.
            </li>
            <li>Promociones exclusivas para jugadores chilenos.</li>
            <li>Retiro de fondos rápido y seguro.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <h3
            className="animate-on-scroll text-sky-blue"
            data-animate="fadeInUp"
          >
            5. JackpotCity
          </h3>
          <ul className="animate-on-scroll" data-animate="fadeInUp">
            <li>Especialista en tragamonedas progresivas.</li>
            <li>Licencia de la MGA (Malta Gaming Authority).</li>
            <li>Servicio al cliente disponible 24/7.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <h2
            className="animate-on-scroll text-lighter-yellow text-2xl font-medium mt-10"
            data-animate="fadeInUp"
          >
            🔎 ¿Qué Debes Buscar en un Casino Online en Chile?
          </h2>
          <ul className="risk-list animate-on-scroll" data-animate="fadeInUp">
            <li>
              <strong>Licencia y regulación:</strong> Asegúrate de que el casino
              esté licenciado por autoridades reconocidas.
            </li>
            <li>
              <strong>Métodos de pago:</strong> Busca opciones locales como
              WebPay, transferencias bancarias y criptomonedas.
            </li>
            <li>
              <strong>Variedad de juegos:</strong> Desde tragamonedas hasta
              casino en vivo.
            </li>
            <li>
              <strong>Bonificaciones y promociones:</strong> Lee siempre los
              términos y condiciones.
            </li>
            <li>
              <strong>Soporte al cliente:</strong> 24/7 y en español es lo
              ideal.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <h2
            className="animate-on-scroll text-lighter-yellow text-2xl font-medium mt-10"
            data-animate="fadeInUp"
          >
            🔄 Preguntas Frecuentes sobre Casinos Online en Chile
          </h2>
          <Accordion type="multiple">
            <AccordionItem value="item-1" className="border-lighter-yellow">
              <AccordionTrigger className="font-bold text-lighter-yellow text-base">
                ¿Es legal jugar en casinos online en Chile?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Sí, los jugadores chilenos pueden jugar en casinos
                internacionales que acepten jugadores de Chile.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-lighter-yellow">
              <AccordionTrigger className="font-bold text-lighter-yellow text-base">
                ¿Cuál es el mejor casino online para bonos de bienvenida?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Pin-Up Casino y Betsson ofrecen algunos de los bonos más
                atractivos del mercado.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-lighter-yellow">
              <AccordionTrigger className="font-bold text-lighter-yellow text-base">
                ¿Puedo depositar en pesos chilenos (CLP)?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Muchos casinos permiten depositar directamente en CLP o usan
                conversores automáticos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <h2
            className="animate-on-scroll text-lighter-yellow text-2xl font-medium mt-10"
            data-animate="fadeInUp"
          >
            👉 Conclusión
          </h2>
          <p className="animate-on-scroll" data-animate="fadeInUp">
            Elegir el mejor casino online en Chile depende de tus preferencias
            personales, pero si buscas un sitio confiable, seguro y con una
            experiencia de usuario sobresaliente, Pin-Up Casino debería estar en
            la parte superior de tu lista.
          </p>
          <div
            className="promo-box animate-on-scroll bg-cyan-600 p-4 rounded-xl my-2"
            data-animate="fadeInUp"
          >
            <p className="text-center font-bold">
              Haz clic aquí para registrarte en Pinup, reclamar tu bono de
              bienvenida y comenzar a disfrutar de toda la diversión que te
              espera.
            </p>
          </div>
          <blockquote
            className="p-4 my-4 border-s-4 border-lighter-yellow bg-lighter-yellow/5 animate-on-scroll"
            data-animate="fadeInUp"
          >
            ✨ ¡Recuerda siempre jugar de manera responsable y con moderación!
            ✨
          </blockquote>
        </div>
      </section>
    </main>
  );
}
