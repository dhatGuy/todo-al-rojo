import { Button } from "@repo/ui/button";
import { Link } from "@tanstack/react-router";

const navItems = [
  { name: "Inicio", path: "/" },
  { name: "Recompensas", path: "/recompensas" },
  { name: "Promociones", path: "/promociones" },
  { name: "Tareas", path: "/tareas" },
  { name: "Ranking", path: "/ranking" },
  { name: "Afiliados", path: "/afiliados" },
  { name: "Soporte", path: "/soporte" },
];

export const Header = () => {
  return (
    <header className="relative z-10 w-full px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="rounded bg-white px-3 py-2 text-xl font-bold text-red-600">
            TODO AL
            <br />
            <span className="text-2xl">ROJO</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center space-x-8 lg:flex">
          {navItems.map((item, index) => (
            <Link
              id={`${item.name}-${item.path}`}
              to={item.path}
              className={`font-medium text-white transition-colors duration-200 hover:text-yellow-300 ${
                index === 0 ? "border-b-2 border-red-500 pb-1" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Login Button */}
        <Button className="rounded-full bg-yellow-400 px-6 py-2 font-semibold text-black transition-all duration-200 hover:scale-105 hover:bg-yellow-300">
          Iniciar sesión / Registrarse
        </Button>
      </div>
    </header>
  );
};
