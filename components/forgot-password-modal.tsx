import { useMutation } from "@tanstack/react-query";
import { AlertCircle, CheckCircle, Mail } from "lucide-react";
import { useId, useState } from "react";
import { authClient } from "src/utils/auth-client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";

interface ForgotPasswordModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const schema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

export function ForgotPasswordModal({
	open,
	onOpenChange,
}: ForgotPasswordModalProps) {
	const [email, setEmail] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState("");
	const id = useId();

	const mutation = useMutation({
		mutationFn: async (email: string) => {
			return await authClient.requestPasswordReset({
				email,
				redirectTo: `${window.location.origin}/reset-password`,
			});
		},
		onSuccess: () => {
			setIsSuccess(true);
		},
		onError: () => {
			setError("Failed to send reset link");
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		const parsed = schema.safeParse({ email });
		if (!parsed.success) {
			setError(parsed?.error?.errors[0]?.message || "Invalid email address");
			return;
		}

		mutation.mutate(email);
	};

	const handleClose = () => {
		onOpenChange(false);

		setTimeout(() => {
			setIsSuccess(false);
			setEmail("");
			setError("");
		}, 2000);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-md bg-dark-blue border-none text-white">
				<DialogHeader className="text-center">
					<DialogTitle className="text-gray-50 text-xl font-bold flex items-center justify-center gap-2">
						{isSuccess ? (
							<>
								<CheckCircle className="h-5 w-5 text-green-400" />
								Email Sent!
							</>
						) : (
							<>
								<Mail className="h-5 w-5 text-gray-300" />
								Reset Password
							</>
						)}
					</DialogTitle>
					<DialogDescription className="text-gray-300">
						{isSuccess
							? "We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password."
							: "Enter your email address and we'll send you a link to reset your password."}
					</DialogDescription>
				</DialogHeader>

				{isSuccess ? (
					<div className="flex flex-col items-center gap-4 py-4">
						<Button
							onClick={handleClose}
							className="w-full rojo-gradient text-black font-bold h-12 rounded-lg"
						>
							Close
						</Button>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<FloatingLabelInput
								label="Email Address"
								id={id}
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={mutation.isPending}
							/>
						</div>

						{error && (
							<div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
								<AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
								<p className="text-sm text-red-400">{error}</p>
							</div>
						)}

						<div className="flex flex-col gap-3">
							<Button
								type="submit"
								className="w-full rojo-gradient font-bold h-12 rounded-lg text-black disabled:opacity-50"
								loading={mutation.isPending}
							>
								Send Reset Link
							</Button>

							<Button
								type="button"
								variant="ghost"
								onClick={handleClose}
								className="w-full text-gray-300 hover:text-gray-100 hover:bg-slate-800"
								disabled={mutation.isPending}
							>
								Cancel
							</Button>
						</div>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
}
