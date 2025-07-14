import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
// import {
// 	googleSigninMutationOptions,
// 	signinMutationOptions,
// } from "src/queries/auth.queries";
// import { SigninSchema } from "src/schemas/auth.schema";
// import { mutationOptions } from "src/utils/mutationOptions";
import { ForgotPasswordModal } from "~/components/forgot-password-modal";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { FloatingLabelInput } from "~/components/ui/floating-label-input";
import { Form, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import bgSignup from "../assets/images/signup-bg.png";

export default function SignIn() {
	// const router = useRouter();
	// const canGoBack = useCanGoBack();
	// const mutation = useMutation(mutationOptions(signinMutationOptions()));
	// const googleSigninMutation = useMutation(
	// 	mutationOptions(googleSigninMutationOptions()),
	// );
	// const [showForgotPassword, setShowForgotPassword] = useState(false);

	// const form = useForm({
	// 	resolver: zodResolver(SigninSchema),
	// 	defaultValues: {
	// 		email: "",
	// 		password: "",
	// 		rememberMe: false,
	// 	},
	// });

	// const onSubmit = async (data: SigninSchema) => {
	// 	mutation.mutate(data, {
	// 		onSuccess: (data) => {
	// 			if (data.error) {
	// 				toast.error(data.error.message || "An error occurred", {
	// 					position: "bottom-left",
	// 				});
	// 				return;
	// 			}
	// 			toast.success("Logged in successfully!");
	// 			router.navigate({
	// 				to: "/dashboard",
	// 			});
	// 		},
	// 		onError: (error) => {
	// 			console.log(error);
	// 			toast.error("Failed to login", {
	// 				position: "bottom-left",
	// 			});
	// 		},
	// 	});
	// };

	// const handleGoogleSignin = () => {
	// 	googleSigninMutation.mutate(undefined, {
	// 		onSuccess: (data) => {
	// 			// if (data.error) {
	// 			//   toast.error(data.error.message || "An error occurred", {
	// 			//     position: "bottom-left",
	// 			//   });
	// 			//   return;
	// 			// }
	// 			// toast.success("Logged in successfully!");
	// 			// router.navigate({
	// 			//   to: "/dashboard",
	// 			// });
	// 		},
	// 		onError: (error) => {
	// 			console.log(error);
	// 			toast.error("Failed to login with Google", {
	// 				position: "bottom-left",
	// 			});
	// 		},
	// 	});
	// };

	return (
		<>
			<section className="lg:block lg:fixed lg:inset-0 lg:z-50 bg-[#333]">
				<div className="flex lg:items-center lg:justify-center min-h-svh lg:p-8">
					<div
						className={`grid lg:grid-cols-12 mx-auto w-full lg:max-w-6xl lg:rounded-4xl overflow-hidden lg:shadow-2xl lg:max-h-[90vh]
          bg-no-repeat bg-cover
          `}
						style={{ backgroundImage: `url(${bgSignup})` }}
					>
						<main className="flex flex-col px-0 py-0 lg:col-span-5 bg-dark-blue xl:col-span-4 overflow-y-auto lg:max-h-[90svh] lg:rounded-4xl">
							<div className="flex flex-col gap-10 size-full">
								<div className="bg-red-700 rounded-bl-4xl px-8 py-10">
									<Button
										className=""
										size="icon"
										variant="ghost"
										// onClick={() =>
										// 	canGoBack
										// 		? router.history.back()
										// 		: router.navigate({
										// 				to: "/",
										// 			})
										// }
									>
										<ArrowLeft color="white" />
									</Button>

									<h1 className="mt-6 text-gray-50 text-2xl font-bold sm:text-3xl md:text-4xl">
										Welcome <br /> Back!
									</h1>
								</div>

								{/* <Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										action="#"
										className="grid grid-cols-6 gap-8 px-8"
									>
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem className="col-span-6">
													<FloatingLabelInput
														{...field}
														label="Email"
														id="email"
													/>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<FormItem className="col-span-6">
													<FloatingLabelInput
														{...field}
														label="Password"
														id="password"
														type="password"
													/>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="rememberMe"
											render={({ field }) => (
												<FormItem className="col-span-6 flex items-center justify-between -mt-4">
													<div className="flex items-center gap-3 mb-0">
														<Checkbox
															id="rememberMe"
															className="bg-white data-[state=checked]:bg-white my-auto"
															checked={field.value}
															onCheckedChange={field.onChange}
														/>

														<Label
															htmlFor="rememberMe"
															className="text-sm font-medium text-gray-200"
														>
															Remember me
														</Label>
													</div>
													<Button
														variant="link"
														className="font-semibold text-gray-200 p-0"
														type="button"
														onClick={() => setShowForgotPassword(true)}
													>
														Forgot Password?
													</Button>
												</FormItem>
											)}
										/>

										<div className="col-span-6 flex flex-col gap-4">
											<Button
												className="w-full rojo-gradient font-bold h-12 rounded-lg"
												disabled={googleSigninMutation.isPending}
												loading={mutation.isPending}
											>
												Sign In
											</Button>
											<Button
												loading={googleSigninMutation.isPending}
												disabled={mutation.isPending}
												type="button"
												onClick={handleGoogleSignin}
												className="h-12 font-bold rounded-lg flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 shadow-sm bg-white hover:bg-gray-100 transition"
											>
												<svg
													className="w-5 h-5"
													viewBox="0 0 533.5 544.3"
													xmlns="http://www.w3.org/2000/svg"
												>
													<title>Google logo</title>
													<path
														d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h146.9c-6.3 34.1-25.1 62.9-53.6 82.2v68.2h86.7c50.7-46.7 81.5-115.6 81.5-195.3z"
														fill="#4285F4"
													/>
													<path
														d="M272 544.3c72.6 0 133.6-24.1 178.1-65.5l-86.7-68.2c-24.1 16.1-55 25.6-91.4 25.6-70.3 0-129.9-47.6-151.2-111.4H30.1v69.9c44.6 88.3 136.6 149.6 241.9 149.6z"
														fill="#34A853"
													/>
													<path
														d="M120.8 324.8c-10.1-30.3-10.1-62.9 0-93.2V161.7H30.1c-39.6 78.9-39.6 171.9 0 250.8l90.7-70.9z"
														fill="#FBBC05"
													/>
													<path
														d="M272 107.7c39.5-.6 77.4 13.9 106.3 40.4l79.4-79.4C411.2 24.1 342.3 0 272 0 166.7 0 74.7 61.3 30.1 149.6l90.7 69.9C142.1 155.3 201.7 107.7 272 107.7z"
														fill="#EA4335"
													/>
												</svg>
												<span className="text-sm text-gray-700 font-bold">
													Sign in with Google
												</span>
											</Button>

											<div className="text-center mt-4">
												<p className="text-gray-200 text-sm">
													Don't have an account?{" "}
													<Link
														to="/signup"
														className="text-white hover:underline font-medium"
													>
														Sign up
													</Link>
												</p>
											</div>
										</div>
									</form>
								</Form> */}

								<Link to="/" className="h-full grid items-center">
									<img
										src="/todoalrojo-logo.png"
										alt="TodoAlRojo Logo"
										className="w-32 sm:w-44 mx-auto md:mt-0"
									/>
								</Link>
							</div>
						</main>

						<aside className="hidden sticky right-0 top-0 h-screen lg:block lg:col-span-7 xl:col-span-8 w-full"></aside>
					</div>
				</div>
			</section>
			{/* <ForgotPasswordModal
				open={showForgotPassword}
				onOpenChange={setShowForgotPassword}
			/> */}
		</>
	);
}
