import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import { FloatingLabelInput } from "@repo/ui/components/floating-label-input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { toast } from "@repo/ui/components/toast";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useCanGoBack,
  useRouter,
} from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { signupMutationOptions } from "src/queries/auth.queries";
import { type SignupSchema, signupSchema } from "src/schemas/auth.schema";
import { getErrorMessage } from "src/utils/auth-client";
import bgSignup from "../../assets/images/signup-bg.png";

export const Route = createFileRoute("/_auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const mutation = useMutation(signupMutationOptions());

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      termsAccepted: false,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      confirmPassword: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupSchema) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        if (data.error) {
          const errorCode = data.error.code;
          if (errorCode === "USER_ALREADY_EXISTS") {
            form.setError("email", {
              type: "custom",
              message: "User already exists",
            });
          }
          if (errorCode === "PHONE_NUMBER_ALREADY_EXISTS") {
            form.setError("phoneNumber", {
              type: "custom",
              message: "Phone number already exists",
            });
          }

          const errorMessage = getErrorMessage(errorCode);
          if (errorMessage) {
            toast.error(errorMessage, {
              position: "bottom-left",
            });
          } else {
            toast.error("An unknown error occurred.", {
              position: "bottom-left",
            });
          }
          return;
        }

        toast.success("Account created successfully!");
        router.navigate({
          to: "/dashboard",
        });
      },
      onError: (error) => {
        console.error(error);
        toast.error("An unknown error occurred.", {
          position: "bottom-left",
        });
      },
    });
  };

  return (
    <section className="lg:block lg:fixed lg:inset-0 lg:z-50 bg-[#333]">
      <div className="flex lg:items-center lg:justify-center min-h-svh lg:p-8">
        <div
          className="grid lg:grid-cols-12 mx-auto w-full lg:max-w-6xl bg-white lg:rounded-4xl overflow-hidden lg:shadow-2xl lg:max-h-[90vh] bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${bgSignup})` }}
        >
          <main className="flex flex-col px-0 py-0 lg:col-span-5 bg-dark-blue xl:col-span-4 overflow-y-auto lg:max-h-[90svh] lg:rounded-4xl">
            <div className="flex flex-col gap-10 size-full">
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
                  Create <br /> Account.
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
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="col-span-full">
                        <FloatingLabelInput
                          {...field}
                          label="First Name"
                          id="firstName"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="col-span-full">
                        <FloatingLabelInput
                          {...field}
                          label="Last name"
                          id="lastName"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="col-span-full">
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
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="col-span-full">
                        <FloatingLabelInput
                          {...field}
                          label="Phone Number"
                          id="phoneNumber"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="col-span-full">
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
                      <FormItem className="col-span-full">
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

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="col-span-full">
                        <div className="flex gap-3 items-center">
                          <Checkbox
                            className="bg-white data-[state=checked]:bg-white"
                            id="termsAccepted"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FormLabel
                            htmlFor="termsAccepted"
                            className="text-sm text-gray-200"
                          >
                            Agree to terms and conditions
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-6 sm:flex flex-col sm:gap-4">
                    <Button
                      loading={mutation.isPending}
                      className="w-full rojo-gradient font-bold h-12 rounded-lg"
                    >
                      Sign Up
                    </Button>

                    <p className="flex justify-between font-medium mt-4 text-sm text-white sm:mt-0">
                      <span>Already have an account?</span>
                      <Link to="/signin" className="hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>

              <Link to="/" className="flex justify-center">
                <img
                  alt="Todo al Rojo Logo"
                  src="/todoalrojo-logo.png"
                  className="w-32 sm:w-44 mx-auto py-8"
                />
              </Link>
            </div>
          </main>

          <aside
            className="hidden sticky right-0 top-0 h-screen lg:block lg:col-span-7 xl:col-span-8 w-full bg-cover bg-no-repeat bg-right"
            style={{ backgroundImage: `url(${bgSignup})` }}
          ></aside>
        </div>
      </div>
    </section>
  );
}
