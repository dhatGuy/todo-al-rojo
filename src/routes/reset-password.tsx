import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { mutationOptions } from "@/lib/mutationOptions";
import { seo } from "@/lib/seo";
import { resetPasswordMutationOptions } from "@/queries/auth.queries";
import { ResetPasswordSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordSearchSchema = z.object({
  token: z.string().min(1, "Token is required"),
  error: z.string().optional(),
});

export const Route = createFileRoute("/reset-password")({
  component: RouteComponent,
  head: () => ({
    meta: [
      ...seo({
        title: "Reset Password - TodoAlRojo",
      }),
    ],
  }),
  validateSearch: zodValidator(resetPasswordSearchSchema),
  beforeLoad: async ({ search }) => {
    const parsed = resetPasswordSearchSchema.safeParse(search);
    if (!parsed.success) {
      throw redirect({
        to: "/signin",
        search,
      });
    }
  },
});

function RouteComponent() {
  const router = useRouter();
  const mutation = useMutation(mutationOptions(resetPasswordMutationOptions()));
  const { token } = Route.useSearch();

  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    mutation.mutate(
      {
        newPassword: data.password,
        token,
      },
      {
        onSuccess: (data) => {
          if (data.error) {
            toast.error(data.error.message || "An error occurred", {
              position: "bottom-left",
              description:
                data.error.code === "INVALID_TOKEN"
                  ? "This password reset link is invalid or has expired. Please request a new one to continue."
                  : "",
            });
            return;
          }
          toast.success("Password reset successfully!");
          router.navigate({
            to: "/signin",
            replace: true,
          });
        },
        onError: (error) => {
          console.log(error);
          toast.error("Failed to reset password", {
            description:
              "Please, request a new reset link if the problem persists.",
            position: "bottom-left",
          });
        },
      },
    );
  };

  return (
    <section className="lg:block lg:fixed lg:inset-0 lg:z-50 bg-[#333]">
      <div className="flex lg:items-center lg:justify-center min-h-svh lg:p-8">
        <div
          className={`grid lg:grid-cols-12 mx-auto w-full lg:max-w-6xl lg:rounded-4xl overflow-hidden lg:shadow-2xl lg:max-h-[90vh]
          bg-no-repeat bg-cover
          `}
          style={{ backgroundImage: `url('/images/signup-bg.png')` }}
        >
          <main className="flex flex-col px-0 py-0 lg:col-span-5 bg-dark-blue xl:col-span-4 overflow-y-auto lg:max-h-[90svh] lg:rounded-4xl">
            <div className="flex flex-col gap-10 size-full">
              <div className="bg-red-700 rounded-bl-4xl px-8 py-10">
                <h1 className="mt-6 text-gray-50 text-2xl font-bold sm:text-3xl md:text-4xl">
                  Reset <br /> Password
                </h1>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  action="#"
                  className="grid grid-cols-6 gap-8 px-8"
                >
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
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="col-span-6">
                        <FloatingLabelInput
                          {...field}
                          label="Confirm Password"
                          id="confirmPassword"
                          type="password"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-6 sm:flex flex-col sm:gap-4">
                    <Button
                      className="w-full rojo-gradient font-bold h-12 rounded-lg"
                      loading={mutation.isPending}
                    >
                      Reset Password
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="h-full grid items-center">
                <Link to="/">
                  <img
                    src="/todoalrojo-logo.png"
                    alt="TodoAlRojo Logo"
                    className="w-32 sm:w-44 mx-auto md:mt-8"
                  />
                </Link>
              </div>
            </div>
          </main>

          <aside className="hidden sticky right-0 top-0 h-screen lg:block lg:col-span-7 xl:col-span-8 w-full"></aside>
        </div>
      </div>
    </section>
  );
}
