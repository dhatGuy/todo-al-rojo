import { cn } from "@repo/ui";
import { Avatar, AvatarImage } from "@repo/ui/avatar";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import bronzeCrown from "../../assets/images/bronze.png";
import goldCrown from "../../assets/images/gold.png";
import chipImg from "../../assets/images/rj-chips.png";
import silverCrown from "../../assets/images/silver.png";
import pokerImg from "../../assets/images/why-join.png";

import { CircleArrowRight } from "lucide-react";

export const LeaderboardSection = () => {
  return (
    <section className="bg-[#393B69] bg-gradient-to-b from-[#393B69] via-[#01000E] to-[#000017] py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-4xl font-bold text-white md:text-5xl">
          Tablas de Clasificación
        </h2>

        <div
          className={cn(
            "mb-8 flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6",
          )}
        >
          {leaderboardUsers.map((user, i) => {
            // Set order: on mobile, 2nd user first, then 1st, then 3rd
            // On md+, use default order
            let orderClass = "";
            if (i === 0) orderClass = "order-2 md:order-1";
            else if (i === 1) orderClass = "order-1 md:order-2";
            else if (i === 2) orderClass = "order-3 md:order-3";
            return (
              <Card
                key={i}
                className={cn(
                  "overflow-hidden border-none shadow-lg",
                  user.bgClass,
                  "relative p-6",
                  i === 1 ? "md:scale-110" : "md:scale-90",
                  orderClass,
                )}
              >
                <span
                  className={cn(
                    "absolute top-4 left-4 text-6xl font-bold opacity-70 md:text-7xl",
                    user.textClass,
                  )}
                >
                  {user.rank}
                </span>

                <div className="flex flex-col items-center pt-8">
                  <div className="relative mb-4 grid w-full place-items-center">
                    <img
                      className="absolute h-28 w-28 object-cover [grid_area:1/1]"
                      src={
                        i === 0
                          ? silverCrown
                          : i === 1
                            ? goldCrown
                            : bronzeCrown
                      }
                    ></img>
                    <Avatar
                      className={cn(
                        "h-[60px] w-[60px] rounded-full [grid_area:1/1]",
                      )}
                    >
                      <AvatarImage src={user.image} />
                    </Avatar>
                  </div>

                  <h3 className="mb-1 text-xl font-bold text-black">
                    {user.name}
                  </h3>

                  <div className="flex items-center">
                    <img
                      className="mr-2 h-5 w-5 object-contain"
                      src={chipImg}
                      alt="points-icon"
                    />
                    <span className="font-semibold text-black">
                      {user.points}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* View Complete Table Link */}
        <div className="mb-16 flex justify-end">
          <Button
            variant="link"
            className="group flex items-center font-semibold text-[#abadde]"
          >
            Ver Tabla Completa
            <CircleArrowRight className="" />
          </Button>
        </div>

        {/* Why Choose Section */}
        <div className="mt-20 grid items-center gap-12 md:grid-cols-8">
          {/* Left Side - Image */}
          <div className="relative row-span-full col-span-full md:col-span-4">
            <div className="h-[500px] w-full overflow-hidden">
              <div
                style={{
                  backgroundImage: `url(${pokerImg})`,
                }}
                className="absolute inset-0 bg-cover md:bg-contain bg-center bg-no-repeat opacity-50 md:opacity-100 md:aspect-square"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="md:col-span-4 row-span-full col-span-full bg-transparent z-10">
            <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">
              ¿Por qué elegir
              <span className="block text-4xl text-yellow-400 md:text-5xl">
                Todoalrojo?
              </span>
            </h2>

            <p className="my-6 text-gray-300">
              Ofrecemos ofertas personalizadas de casino y apuestas deportivas,
              recompensando a los usuarios con un sistema gamificado basado en
              Red Chips.
            </p>

            <p className="mb-8 text-gray-300">
              Con seguimiento inteligente de FTD y total transparencia,
              impulsamos el compromiso y el rendimiento de afiliados.
            </p>

            <div>
              <h3 className="mb-4 text-3xl font-bold text-yellow-400">
                Cómo unirse
              </h3>
              <p className="mb-6 text-gray-300">
                ¡Haz clic en los botones de abajo para unirte a nuestra
                comunidad y ganar EN GRANDE!
              </p>

              <div className="flex flex-col gap-4 sm:flex-row justify-end md:justify-start">
                <Button className="flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-5 font-semibold text-white hover:bg-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="currentColor"
                      d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                    />
                  </svg>
                  Únete a WhatsApp
                </Button>

                <Button className="flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-5 font-semibold text-white hover:bg-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                    width="24"
                    height="24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                    >
                      <path d="M.75 7a6.25 6.25 0 1 0 12.5 0A6.25 6.25 0 1 0 .75 7" />
                      <path d="m9.742 3.811l-.525 6.822l-2.882-2.958L2.92 6.96z" />
                      <path d="m5.063 7.406l.513 2.962l1.877-1.555M6.332 7.66l1.094-.875" />
                    </g>
                  </svg>
                  Únete a Telegram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const leaderboardUsers = [
  {
    rank: "2ND",
    name: "Ruben Dias",
    points: "1,600",
    bgClass: "bg-gradient-to-b from-gray-300 to-gray-400",
    textClass: "text-gray-300",
    image: "https://picsum.photos/200",
  },
  {
    rank: "1ST",
    name: "Felipe Pastenes",
    points: "2,000",
    bgClass: "bg-gradient-to-b from-yellow-300 to-yellow-400",
    textClass: "text-yellow-300",
    image: "https://picsum.photos/200",
  },
  {
    rank: "3RD",
    name: "Thiago Silva",
    points: "1,500",
    bgClass: "bg-gradient-to-b from-amber-600 to-amber-700",
    textClass: "text-amber-600",
    image: "https://picsum.photos/200",
  },
];
