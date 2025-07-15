import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/dashboard/")({
	component: RouteComponent,
	// beforeLoad: async () => {
	// 	const { data } = await authClient.getSession();

	// 	if (!data?.session) {
	// 		throw redirect({
	// 			to: "/signin",
	// 		});
	// 	}
	// },
});

function RouteComponent() {
	return (
		<div className="flex flex-col min-h-screen gap-12">
			<Card className="bg-dark-blue w-full rounded-lg md:rounded-full p-3 sm:p-4">
				<CardContent className="p-0">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
						<h3 className="text-xs sm:text-sm text-gray-400">Nivel 3</h3>
						<Progress
							value={75}
							className="h-1.5 sm:h-2 md:h-3 bg-gray-700 w-full sm:flex-1"
						/>
						<span className="text-gray-400 text-xs sm:text-sm">
							75% completado
						</span>
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 h-auto gap-4 sm:gap-6">
				{/* Chips Balance */}
				<div className="row-span-full md:row-span-1 md:col-span-2 bg-dark-blue backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col justify-center hover:transform hover:-translate-y-1 transition-all duration-200">
					<h2 className="text-gray-400 text-lg sm:text-xl font-medium mb-3 sm:mb-4">
						Chips Balance
					</h2>
					<div className="flex items-center gap-3 sm:gap-4">
						<div className="w-12 h-12 sm:w-15 sm:h-15 bg-red-600 rounded-full flex items-center justify-center relative">
							<div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full"></div>
							<div className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full scale-110"></div>
						</div>
						<span className="text-4xl sm:text-6xl font-bold text-white">
							2,000
						</span>
					</div>
				</div>

				{/* Active Tasks */}
				<div className="md:col-span-2 md:col-start-3 bg-dark-blue backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col hover:transform hover:-translate-y-1 transition-all duration-200">
					<h2 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
						Tareas activas
					</h2>
					<div className="space-y-3 sm:space-y-4 overflow-y-auto">
						{activeTasks.map((item) => (
							<div
								key={item.title}
								className="bg-[#101227] rounded-xl p-3 sm:p-4 flex items-center justify-between"
							>
								<div className="flex items-center gap-3 sm:gap-4">
									<div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
										▲
									</div>
									<div>
										<h3 className="text-white font-semibold text-sm sm:text-base">
											{item.title}
										</h3>
										<p className="text-gray-400 text-xs sm:text-sm">
											{item.description}
										</p>
									</div>
								</div>
								<div className="text-lime-300 font-semibold text-sm sm:text-base">
									+{item.chips} RC
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Buttons Grid */}
				<div className="md:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
					<button className="bg-[#1e203a] backdrop-blur-lg rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 text-white hover:bg-card-blue/90 hover:transform hover:-translate-y-1 transition-all duration-200">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center text-xl sm:text-2xl">
							🎁
						</div>
						<span className="font-semibold text-sm sm:text-base text-center">
							Reclamar Bono
						</span>
					</button>

					<button className="bg-[#1e203a] backdrop-blur-lg rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 text-white hover:bg-card-blue/90 hover:transform hover:-translate-y-1 transition-all duration-200">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center text-xl sm:text-2xl">
							🛍️
						</div>
						<span className="font-semibold text-sm sm:text-base text-center">
							Tienda
						</span>
					</button>

					<button className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 text-white hover:from-red-500 hover:to-red-600 hover:transform hover:-translate-y-1 transition-all duration-200">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center text-xl sm:text-2xl">
							📊
						</div>
						<span className="font-semibold text-sm sm:text-base text-center">
							Invitar Retos
						</span>
					</button>

					<button className="bg-[#1e203a] backdrop-blur-lg rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 text-white hover:bg-card-blue/90 hover:transform hover:-translate-y-1 transition-all duration-200">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center text-xl sm:text-2xl">
							👥
						</div>
						<span className="font-semibold text-sm sm:text-base text-center">
							Invitar Amigos
						</span>
					</button>
				</div>

				{/* Weekly Chips */}
				<div className="md:col-span-2 md:col-start-3 backdrop-blur-lg bg-[#1e203a] rounded-2xl p-4 sm:p-6 flex flex-col justify-center hover:transform hover:-translate-y-1 transition-all duration-200">
					<h2 className="text-white text-2xl sm:text-4xl font-bold mb-2">
						+450 red chips
					</h2>
					<div className="text-indigo-300 text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">
						esta semana
					</div>
					<p className="text-gray-300 text-sm sm:text-base">
						Subiste 3 posiciones en la clasificación
					</p>
				</div>

				{/* Total FTDs and Commission */}
				<div className="md:col-span-2 h-fit bg-dark-blue backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center hover:transform hover:-translate-y-1 transition-all duration-200">
					<div className="text-gray-400 text-sm sm:text-lg mb-2 sm:mb-0">
						Total FTDs: <span className="text-white font-semibold">5</span>
					</div>
					<div className="text-gray-400 text-sm sm:text-lg">
						Comisión generada:{" "}
						<span className="text-white font-semibold">$25,000</span>
					</div>
				</div>
			</div>
		</div>
	);
}

const activeTasks = [
	{
		id: 1,
		title: "Deposita $10,000 CLP",
		description: "Centurta",
		chips: 100,
		type: "deposit",
		status: "active",
	},
	{
		id: 2,
		title: "Invita a 1 amigo",
		description: "Climax",
		chips: 300,
		type: "referral",
		status: "active",
	},
];
