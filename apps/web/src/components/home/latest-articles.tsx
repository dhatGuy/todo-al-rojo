import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

export const LatestArticles = () => {
  return (
    <div className="bg-gray-200">
      <div className="mx-auto max-w-7xl flex-1 px-2 py-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-4xl font-black text-gray-900">
            Últimos Artículos
          </h2>
          <p className="text-gray-700">
            Descubre nuestros últimos artículos y novedades.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card
              key={index}
              className="transform overflow-hidden rounded-xl bg-[#000014] shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardContent className="relative h-32 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=600&auto=format&fit=crop&q=60&h=300"
                  alt="Tablet mostrando juegos de casino online"
                  className="h-full w-full rounded-xl object-cover"
                />
              </CardContent>
              <CardHeader className="">
                <CardTitle className="mb-2 text-xl font-bold">
                  Por Qué Elegir Buenos Proveedores...?
                </CardTitle>
                <CardDescription className="mb-3 text-sm text-gray-300">
                  Un proveedor confiable transforma tu experiencia: sin estrés,
                  sin fraudes, pura diversión.
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
