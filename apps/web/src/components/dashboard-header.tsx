import { Button } from "@repo/ui/components/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@repo/ui/components/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@repo/ui/components/sheet";
import { Link } from "@tanstack/react-router";
import { Crown, Menu } from "lucide-react";
import goldCrown from "../assets/images/gold.png";

const navigationItems = [
  { name: "Inicio", href: "#" },
  { name: "Recompensas", href: "#" },
  { name: "Promociones", href: "#" },
  { name: "Tareas", href: "#" },
  { name: "Ranking", href: "#" },
  { name: "Afiliados", href: "#" },
  { name: "Soporte", href: "#" },
];

export default function DashboardNavigation() {
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
                Felipe
              </span>
            </div>
            <div className="relative w-12 h-12 md:w-24 md:h-24">
              {/* Golden Crown Frame Background */}
              <img
                src={goldCrown}
                alt="Crown frame"
                className="absolute inset-0 w-full h-full object-contain"
              />
              {/* User Profile Picture Centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 md:w-12 md:h-12 rounded-full overflow-hidden">
                  <img
                    src="https://picsum.photos/seed/picsum/200/300.webp"
                    alt="Felipe's profile"
                    className="w-full h-full object-cover"
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
                  <Menu className="h-6 w-6" />
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
                              alt="Felipe's profile"
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-300 text-sm">Bienvenido</div>
                        <div className="text-white font-semibold">Felipe</div>
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
