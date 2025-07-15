import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSession } from "@/lib/auth-client";
import { Link } from "@tanstack/react-router";
import { Crown, Menu } from "lucide-react";

const navigationItems: any[] = [
  // { name: "Inicio", href: "#" },
  // { name: "Recompensas", href: "#" },
  // { name: "Promociones", href: "#" },
  // { name: "Tareas", href: "#" },
  // { name: "Ranking", href: "#" },
  // { name: "Afiliados", href: "#" },
  // { name: "Soporte", href: "#" },
];

export default function DashboardNavigation() {
  const { data } = useSession();

  return (
    <nav className="text-white w-full overflow-hidden">
      <div className="">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu className="">
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle({
                        className: "text-gray-300 hover:text-white",
                      })}
                    >
                      <Link to={item.href}>{item.name}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center space-x-3 ml-auto lg:ml-0">
            <div className="flex flex-col items-center space-x-3">
              <span className="text-gray-400 text-xl hidden sm:block">
                Bienvenido
              </span>
              <span className="text-white text-2xl font-semibold hidden sm:block">
                {data?.user.firstName}
              </span>
            </div>
            <div className="relative size-12 md:size-24">
              {/* Golden Crown Frame Background */}
              <img
                src="/images/gold.png"
                alt="Crown frame"
                className="absolute inset-0 w-full h-full object-contain"
              />
              {/* User Profile Picture Centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-6 md:size-12 rounded-full overflow-hidden">
                  <img
                    src="https://picsum.photos/seed/picsum/200/300.webp"
                    alt={`${data?.user.firstName}`}
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white hover:bg-slate-800"
                >
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-slate-900 text-white border-slate-800"
              >
                <div className="flex flex-col space-y-4 mt-6">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-gray-300 hover:text-white px-3 py-2 text-base font-medium transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {/* Mobile User Info */}
                  <div className="border-t border-slate-700 pt-3 mt-3">
                    <div className="flex items-center px-3 py-2">
                      <div className="relative mr-3">
                        <Crown className="absolute -top-2 -right-1 w-4 h-4 text-yellow-400 z-10" />
                        <div className="w-8 h-8 rounded-full border-2 border-yellow-400 p-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600">
                          <div className="w-full h-full rounded-full overflow-hidden">
                            <img
                              src="/placeholder.svg?height=32&width=32"
                              alt={`${data?.user.firstName}'s Avatar`}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-300 text-sm">Bienvenido</div>
                        <div className="text-white font-semibold">
                          {data?.user.firstName}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
