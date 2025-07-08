import { createFileRoute } from "@tanstack/react-router";
import "./por.css";

export const Route = createFileRoute(
  "/articles/por-que-elegir-buenos-proveedores"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
      <nav
        className="flex justify-center items-center py-4 animate-on-scroll"
        data-animate="fadeInDown"
      >
        <h1>
          <a href="index.html">
            <img
              src="images/todoalrojo-logo.png"
              alt="TODOALROJO"
              className="h-24"
            />
          </a>
        </h1>
      </nav>

      <div className="back-link animate-on-scroll" data-animate="fadeInLeft">
        <a href="index.html">← Volver al inicio</a>
      </div>

      {/* <section className="post-hero">
        <div
          className="hero-background"
          // style="background-image: url('images/bonus.jpg');"
        ></div>
        <div className="hero-content animate-on-scroll" data-animate="fadeInUp">
          <h1 className="font-bold">
            Bonos de Bienvenida en Casinos Online en Chile [Comparativa 2025]
          </h1>
          <p className="intro">
            En Chile, los bonos de bienvenida son una excelente forma de
            comenzar tu experiencia. Te mostramos los tipos de bonos, cómo
            funcionan y cuáles son los mejores en 2025.
          </p>
        </div>
        <div className="hero-shape"></div>
      </section>

      <section className="post-content">
        <h2 className="animate-on-scroll" data-animate="fadeInRight">
          💰 ¿Qué es un Bono de Bienvenida?
        </h2>
        <p className="animate-on-scroll" data-animate="fadeInLeft">
          Un bono de bienvenida es una promoción especial que los casinos online
          ofrecen a los nuevos usuarios para incentivarlos a registrarse y
          realizar su primer depósito. Puede incluir:
        </p>
        <ul className="tick-list animate-on-scroll" data-animate="fadeInUp">
          <li>Dinero extra para jugar</li>
          <li>Giros gratis en tragamonedas</li>
          <li>Bonificaciones combinadas (dinero + giros)</li>
        </ul>

        <h2 className="animate-on-scroll" data-animate="fadeInRight">
          📊 Tipos de Bonos de Bienvenida
        </h2>
        <h3 className="animate-on-scroll" data-animate="fadeInUp">
          1. Bono de Depósito
        </h3>
        <p className="animate-on-scroll" data-animate="fadeInLeft">
          El casino duplica o multiplica tu primer depósito.
        </p>

        <h3 className="animate-on-scroll" data-animate="fadeInUp">
          2. Giros Gratis
        </h3>
        <p className="animate-on-scroll" data-animate="fadeInLeft">
          Ideal para los amantes de las tragamonedas.
        </p>

        <h3 className="animate-on-scroll" data-animate="fadeInUp">
          3. Bonos Sin Depósito
        </h3>
        <p className="animate-on-scroll" data-animate="fadeInLeft">
          Recibes un pequeño saldo o giros gratis simplemente por registrarte.
        </p>

        <h3 className="animate-on-scroll" data-animate="fadeInUp">
          4. Paquetes de Bienvenida
        </h3>
        <p className="animate-on-scroll" data-animate="fadeInLeft">
          Incluyen bonos para varios depósitos iniciales, más giros gratis.
        </p>

        <h2 className="animate-on-scroll" data-animate="fadeInRight">
          🌐 Mejores Bonos de Bienvenida en Chile (2025)
        </h2>
        <div
          className="styled-table-container animate-on-scroll"
          data-animate="fadeInUp"
        >
          <table className="styled-table">
            <thead>
              <tr>
                <th>Casino</th>
                <th>Bono</th>
                <th>Requisitos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pin-Up Casino</td>
                <td>100% hasta $250.000 CLP + 250 giros</td>
                <td>Depósito mínimo $10.000 CLP</td>
              </tr>
              <tr>
                <td>Betsson</td>
                <td>100% hasta $200.000 CLP</td>
                <td>Depósito mínimo $10.000 CLP</td>
              </tr>
              <tr>
                <td>Betano</td>
                <td>100% hasta $100.000 CLP + apuestas gratis</td>
                <td>Depósito mínimo $5.000 CLP</td>
              </tr>
              <tr>
                <td>LeoVegas</td>
                <td>Hasta $150.000 CLP + 20 giros</td>
                <td>Depósito mínimo $10.000 CLP</td>
              </tr>
              <tr>
                <td>JackpotCity</td>
                <td>100% hasta $160.000 CLP</td>
                <td>Depósito mínimo $10.000 CLP</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="animate-on-scroll" data-animate="fadeInLeft">
          ⚠️ Términos y Condiciones que Debes Revisar
        </h2>
        <ul className="risk-list animate-on-scroll" data-animate="fadeInRight">
          <li>
            <strong>Requisitos de apuesta:</strong> cuántas veces debes apostar
            el bono antes de retirar ganancias.
          </li>
          <li>
            <strong>Límite de tiempo:</strong> tiempo disponible para usar el
            bono.
          </li>
          <li>
            <strong>Restricciones de juegos:</strong> algunos bonos solo aplican
            a ciertos juegos.
          </li>
        </ul>

        <h2 className="animate-on-scroll" data-animate="fadeInLeft">
          🔄 Preguntas Frecuentes sobre Bonos de Bienvenida
        </h2>
        <div className="faq-container">
          <div
            className="faq-item animate-on-scroll"
            data-animate="fadeInRight"
          >
            <button className="faq-question">
              ¿Puedo retirar el dinero del bono inmediatamente?
            </button>
            <div className="faq-answer">
              No, primero debes cumplir los requisitos de apuesta que impone
              cada casino.
            </div>
          </div>
          <div className="faq-item animate-on-scroll" data-animate="fadeInLeft">
            <button className="faq-question">
              ¿Vale la pena aceptar un bono de bienvenida?
            </button>
            <div className="faq-answer">
              Sí, siempre que revises las condiciones y elijas casinos
              confiables con requisitos justos.
            </div>
          </div>
          <div className="faq-item animate-on-scroll" data-animate="fadeInUp">
            <button className="faq-question">
              ¿Qué casino ofrece el mejor bono en 2025?
            </button>
            <div className="faq-answer">
              Pin-Up Casino destaca por su bono generoso y sus bajos requisitos
              de apuesta.
            </div>
          </div>
        </div>

        <h2 className="animate-on-scroll" data-animate="fadeInUp">
          📍 Conclusión
        </h2>
        <p className="animate-on-scroll" data-animate="fadeInLeft">
          Un buen bono de bienvenida puede marcar la diferencia. Revisa siempre
          los términos.
        </p>
        <div className="promo-box animate-on-scroll" data-animate="zoomIn">
          ¡Aprovecha al máximo tu primera apuesta en 2025!
        </div>
        <div className="quote-box animate-on-scroll" data-animate="zoomIn">
          ✨ Juega de manera responsable y disfruta. ✨
        </div>
      </section> */}
    </div>
  );
}
