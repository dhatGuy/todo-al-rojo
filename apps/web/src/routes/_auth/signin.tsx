import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import { FloatingLabelInput } from "@repo/ui/components/floating-label-input";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/form";
import { Label } from "@repo/ui/components/label";
import { toast } from "@repo/ui/components/toast";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  useCanGoBack,
  useRouter,
} from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { signinMutationOptions } from "src/queries/auth.queries";
import { SigninSchema } from "src/schemas/auth.schema";
import { mutationOptions } from "src/utils/mutationOptions";
import bgSignup from "../../assets/images/signup-bg.png";

export const Route = createFileRoute("/_auth/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const mutation = useMutation(mutationOptions(signinMutationOptions()));

  const form = useForm({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SigninSchema) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        if (data.error) {
          toast.error(data.error.message || "An error occurred", {
            position: "bottom-left",
          });
          return;
        }
        toast.success("Logged in successfully!");
        router.navigate({
          to: "/dashboard",
        });
      },
      onError: (error) => {
        console.log(error);
        toast.error("Failed to login", {
          position: "bottom-left",
        });
      },
    });
  };

  return (
    <section className="bg-[#2a2e43] min-h-svh">
      <div className="grid min-h-svh lg:grid-cols-12">
        <main className="flex flex-col px-0 py-0 lg:col-span-5 xl:col-span-4 overflow-y-auto pb-10">
          <div className="flex flex-col justify-between gap-10 size-full lg:max-w-3xl">
            <div className="bg-red-700 rounded-bl-4xl px-8 py-10">
              <Button
                className=""
                size="icon"
                variant="ghost"
                onClick={() =>
                  canGoBack
                    ? router.history.back()
                    : router.navigate({
                        to: "/",
                      })
                }
              >
                <ArrowLeft color="white" />
              </Button>

              <h1 className="mt-6 text-gray-50 text-2xl font-bold sm:text-3xl md:text-4xl">
                Welcome <br /> Back!
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-6">
                      <FloatingLabelInput {...field} label="Email" id="email" />
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
                    <FormItem className="col-span-6 flex items-center gap-3">
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
                    </FormItem>
                  )}
                />

                <div className="col-span-6 sm:flex flex-col sm:gap-4">
                  <Button
                    className="w-full rojo-gradient font-bold h-12 rounded-lg"
                    loading={mutation.isPending}
                  >
                    Sign In
                  </Button>

                  <p className="flex justify-end font-semibold mt-4 text-sm text-gray-300 sm:mt-0">
                    <Button
                      variant="link"
                      className="font-semibold"
                      type="button"
                    >
                      Forgot Password?
                    </Button>
                  </p>
                </div>
              </form>
            </Form>

            <img
              src="/todoalrojo-logo.png"
              className="w-32 sm:w-44 mx-auto mt-8"
            />
          </div>
        </main>

        <aside
          className="hidden sticky right-0 top-0 h-screen lg:block lg:col-span-7 xl:col-span-8 w-full bg-cover bg-no-repeat bg-right"
          style={{ backgroundImage: `url(${bgSignup})` }}
        ></aside>
      </div>
    </section>
  );
}
