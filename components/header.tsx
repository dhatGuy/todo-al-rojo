import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/auth-hooks";
import { Link } from "@tanstack/react-router";

const navItems: {
  name: string;
  path: string;
  activeOptions?: { exact: boolean };
}[] = [
  // { name: "Inicio", path: "/", activeOptions: { exact: true } },
  // { name: "Recompensas", path: "/recompensas" },
  // { name: "Promociones", path: "/promociones" },
  // { name: "Tareas", path: "/tareas" },
  // { name: "Ranking", path: "/ranking" },
  // { name: "Afiliados", path: "/afiliados" },
  // { name: "Soporte", path: "/soporte" },
];

export const Header = () => {
  const { data } = useSession();
  return (
    <header className="relative z-10 w-full px-6 bg-[#000017]">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo - Hidden on mobile, shown on desktop */}
        <Link to="/" className="hidden lg:flex items-center">
          <img
            src="/todoalrojo-logo.png"
            alt="Logo"
            className="object-contain w-40 h-24"
          />
        </Link>

        {/* Centered Logo on Mobile */}
        <div className="flex lg:hidden justify-between w-full items-center">
          <Link to="/">
            <img
              src="/todoalrojo-logo.png"
              alt="Logo"
              className="object-contain w-32 sm:w-36 h-24"
            />
          </Link>

          {/* Mobile Menu Trigger */}
          <div>
            {data?.user ? (
              <Avatar asChild className="cursor-pointer size-10">
                {/* @ts-expect-error */}
                <Link to="/dashboard" className="flex items-center">
                  <AvatarImage
                    src={data.user.image || undefined}
                    alt={data.user.name || "Avatar"}
                  />
                  <AvatarFallback>
                    {data.user.name
                      ? data.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Link>
              </Avatar>
            ) : (
              <Button
                className="rounded-full rojo-gradient px-6 py-3 font-semibold text-black transition-all duration-200 hover:scale-105 hover:bg-yellow-300"
                asChild
              >
                <Link to="/signin" className="text-black">
                  Iniciar sesión
                </Link>
              </Button>
            )}
            {/* <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-80 bg-[#000017] border-none overflow-scroll">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-8 mt-4">
                    <img
                      src="/todoalrojo-logo.png"
                      alt="Logo"
                      className="object-contain w-32 sm:w-36 h-24"
                    />
                  </div>

                  <nav className="flex-1">
                    <div className="space-y-2 pl-4">
                      {navItems.map((item) => (
                        <Link
                          key={`mobile-${item.name}-${item.path}`}
                          to={item.path}
                          activeOptions={item.activeOptions}
                          activeProps={{
                            className:
                              "border-b-4 font-semibold border-red-500 pb-1",
                          }}
                          className={`block w-fit pr-4 py-3 text-white transition-colors duration-200 hover:bg-white/1`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </nav>

                  <div className="mt-auto mb-6 mx-auto">
                    <Button
                      className="rounded-full bg-gradient-to-br from-[#D77921] to-[#FFF154] px-6 py-3 font-semibold text-black transition-all duration-200 hover:scale-105 hover:bg-yellow-300"
                      asChild
                    >
                      <Link to="/signin" className="text-black">
                        Iniciar sesión / Registrarse
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet> */}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={`desktop-${item.name}-${item.path}`}
              to={item.path}
              activeProps={{
                className: "font-semibold border-b-4 border-red-500 pb-1",
              }}
              activeOptions={item.activeOptions}
              className={`text-white transition-all duration-200 hover:text-lighter-yellow`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Login Button */}
        {data?.user ? (
          <Avatar
            asChild
            className="hidden lg:flex cursor-pointer mx-10 size-12"
          >
            {/* @ts-expect-error */}
            <Link to="/dashboard" className="flex items-center">
              <AvatarImage
                src={data.user.image || undefined}
                alt={data.user.name || "Avatar"}
                // className="size-12"
              />
              <AvatarFallback>
                {data.user.name
                  ? data.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Link>
          </Avatar>
        ) : (
          <Button
            className="hidden lg:block rounded-full  bg-gradient-to-br from-[#D77921] to-[#FFF154] px-6 py-2 font-semibold text-black transition-all duration-200 hover:scale-105 hover:bg-yellow-300 mx-10"
            asChild
          >
            <Link to="/signin">Iniciar sesión / Registrarse</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
