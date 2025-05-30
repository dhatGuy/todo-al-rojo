import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import betssonImg from "../../assets/images/betsson.png";
import pinup from "../../assets/images/pinup.png";
import thunderpickImg from "../../assets/images/thunderpick.png";

export const BettingHousesSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="mb-12 text-center text-4xl font-extrabold text-black md:text-5xl">
          Las Mejores Casas de Apuestas
          <br />
          <span className="text-black">en un Solo Lugar</span>
        </h2>

        {/* Betting Houses List */}
        <div className="flex flex-col space-y-6">
          {bettingHouses.map((house, index) => (
            <Card
              key={index}
              className="overflow-hidden rounded-2xl border-none bg-[#393848] p-0 shadow-md"
            >
              <div className="flex flex-col items-center md:flex-row md:items-stretch">
                {/* Left - Logo */}
                <div className="flex h-36 max-h-full w-full items-stretch justify-stretch rounded-2xl bg-[#0d0c1e] p-6 md:w-1/4">
                  <img
                    src={house.logo}
                    alt={house.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Middle - Bonus Info */}
                <div className="flex w-full flex-col justify-center p-6 flex-1">
                  <h3 className="mb-2 text-xl font-bold text-white md:text-lg">
                    {house.bonusTitle}
                  </h3>
                  <p className="text-sm text-gray-400">{house.disclaimer}</p>
                </div>

                {/* Right - CTA Button */}
                <div className="flex items-center justify-center px-6 w-full md:w-auto mb-6 md:mb-0">
                  <Button className="w-full rounded-xl bg-[#e01f21] px-6 py-3 font-bold text-white transition-all duration-200 hover:bg-red-700 md:w-auto">
                    Apostar Ahora
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const bettingHouses = [
  {
    name: "Betsson",
    logo: betssonImg,
    bonusTitle: "Bono de Bienvenida Hasta $400.000 CLP + 200 GIROS GRATIS",
    disclaimer:
      "Publicidad | Oferta válida solo para mayores de 18 años. Practica el juego responsablemente.",
  },
  {
    name: "Pin-Up Casino",
    logo: pinup,
    bonusTitle: "Hasta 5 Millones de CLP y 250 FS para Nuevos Usuarios!",
    disclaimer:
      "Publicidad | ¡Regístrate hoy y recibe hasta 5.000.000 CLP y 250 giros gratis!",
  },
  {
    name: "Thunderpick",
    logo: thunderpickImg,
    bonusTitle: "Recibe el 100% de Bono Activo!",
    disclaimer:
      "Publicidad | Bono válido para mayores de 18 años. Juega con Responsabilidad.",
  },
];
