import { useMutation } from "@tanstack/react-query";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { Home, ListTodo, Loader2, LogOut } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";
import PokerChip from "@/assets/icons/poker-chip";
import { Ranking } from "@/assets/icons/ranking";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { mutationOptions } from "@/lib/mutationOptions";
import { cn } from "@/lib/utils";
import { logoutMutationOptions } from "@/queries/auth.queries";

export function AppSidebar() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const router = useRouter();
	const mutation = useMutation(mutationOptions(logoutMutationOptions()));

	const items = useMemo(
		() => [
			{
				title: "Dashboard",
				href: "/dashboard",
				icon: Home,
				exact: true,
			},
			{
				title: "Task",
				href: "/dashboard/tasks",
				icon: ListTodo,
			},
			{
				title: "Shop",
				href: "/dashboard/shop",
				icon: PokerChip,
			},
			{
				title: "Leaderboard",
				href: "/dashboard/leaderboard",
				icon: Ranking,
			},
		],
		[],
	);

	const onLogout = () => {
		mutation.mutate(undefined, {
			onSuccess: () => {
				router.navigate({ to: "/signin" });
				toast.success("Logged out successfully");
			},
			onError: () => {
				toast.error("Failed to logout");
			},
		});
	};

	return (
		<Sidebar collapsible="offcanvas">
			<SidebarHeader>
				<Link to="/">
					<img
						src="/todoalrojo-logo.png"
						alt="Logo"
						className="object-contain w-40 h-24 pl-8"
					/>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup className="p-0">
					<SidebarGroupContent>
						<SidebarMenu className="gap-0 pt-5">
							{items.map((item) => {
								return (
									<SidebarMenuItem
										className={cn(
											"relative",
											item.href === pathname &&
												"before:content-[''] before:absolute before:-top-8 before:right-0 before:w-8 before:h-8 before:z-10 before:bg-transparent before:rounded-full before:shadow-[16px_16px_0_#141A2D] after:content-[''] after:absolute after:-bottom-8 after:right-0 after:w-8 after:h-8 after:z-10 after:bg-transparent after:rounded-full after:shadow-[16px_-16px_0_#141A2D]",
										)}
										key={item.title}
									>
										<Link
											to={item.href}
											activeOptions={{ exact: item.exact }}
											className=""
											activeProps={
												{
													// className: "font-semibold text-white !bg-[#141A2D]",
												}
											}
										>
											{({ isActive }) => {
												return (
													<SidebarMenuButton
														// asChild
														isActive={isActive}
														className={cn(
															"[&>svg]:size-11 px-8 bg-dark-blue relative rounded-none h-16",
														)}
														size="lg"
													>
														{/* <b
                              className={cn(
                                "absolute -top-3 right-0 h-6 w-full bg-[#141A2D] z-10 after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-br-2xl after:bg-dark-blue",
                                !isActive && "after:rounded-none",
                              )}
                            />
                            <b
                              className={cn(
                                "absolute -bottom-3 right-0 h-6 w-full bg-[#141A2D] z-10 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-tr-4xl before:bg-dark-blue",
                                !isActive && "before:rounded-none",
                              )}
                            /> */}
														<>
															<item.icon
															// color={isActive ? "#fff" : "rgb(66 67 87)"}
															// height={32}
															// width={32}
															/>
															<span className="text-[1rem] ml-3">
																{item.title}
															</span>
														</>
													</SidebarMenuButton>
												);
											}}
										</Link>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="border-t border-gray-700 mx-8 pb-10">
				<SidebarMenuButton
					disabled={mutation.isPending}
					className="w-full h-auto font-bold text-base text-red-600 gap-4"
					onClick={onLogout}
				>
					{mutation.isPending ? (
						<>
							<Loader2 className="mr-2 animate-spin" />
							Logging out...
						</>
					) : (
						<>
							<LogOut className="!size-8 text-white" />
							Logout
						</>
					)}
				</SidebarMenuButton>
			</SidebarFooter>
		</Sidebar>
	);
}
