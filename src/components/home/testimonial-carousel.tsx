import { faker } from "@faker-js/faker";
import AutoScroll from "embla-carousel-auto-scroll";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

export function TestimonialCarousel() {
	const autoScroll = AutoScroll({
		speed: 1,
		stopOnMouseEnter: true,
		stopOnInteraction: false,
		direction: "backward",
	});

	return (
		<div className="w-full max-w-7xl mx-auto">
			<Carousel
				opts={{
					align: "center",
					loop: true,
					slidesToScroll: 1,
					// direction: "rtl",
					breakpoints: {
						"(min-width: 768px)": {
							slidesToScroll: 2,
						},
						"(min-width: 1024px)": {
							slidesToScroll: 3,
						},
					},
				}}
				plugins={[autoScroll]}
				className="w-full"
			>
				<CarouselContent className="-ml-2 md:-ml-4 overflow-visible">
					{testimonials.map((testimonial) => (
						<CarouselItem
							key={testimonial.name}
							className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 pt-6"
						>
							<div className="relative flex flex-col h-full">
								<div className="absolute -top-6 left-0 rotate-180 text-white z-20">
									<Quote size={48} fill="white" />
								</div>
								<Card className="relative rounded-xl bg-[#353446] p-6 flex-1 pt-8">
									<CardContent>
										<div className="flex flex-col items-center">
											<Avatar className="mr-4 flex-1 min-h-20 min-w-20 size-20">
												<AvatarImage
													src={faker.image.personPortrait({
														size: 128,
													})}
													alt={testimonial.name}
												/>
												<AvatarFallback className="bg-red-700 text-white size-20">
													{testimonial.name
														.split(" ")
														.map((word) => word[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div className="flex-2 flex flex-col items-center">
												<p className="mt-4 mb-2 text-center text-gray-300 italic">
													{testimonial.quote}
												</p>
												<span className="font-bold text-white">
													{testimonial.name}
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				{/* <CarouselPrevious className="hidden sm:flex -left-12 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl" />
        <CarouselNext className="hidden sm:flex -right-12 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl" /> */}
			</Carousel>
		</div>
	);
}

// Testimonial data
const testimonials = [
	{
		quote: "¡Servicio muy bueno y confiable, a cualquier hora y cualquier día!",
		name: "Juan Cruz",
	},
	{
		quote: '"Excelente opción, altamente recomendable."',
		name: "Jorge Santisteban",
	},
	{
		quote: "¡Muy buena experiencia! ¡Muchas graaaaacias!",
		name: "Diego Ramírez",
	},
	{
		quote: "¡Muy buena atención y servicio! ¡Gracias!",
		name: "María López",
	},
	{
		quote: "¡Excelente servicio, muy recomendable!",
		name: "Carlos Pérez",
	},
];
