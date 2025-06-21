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
  Link,
  useCanGoBack,
  useRouter,
} from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ForgotPasswordModal } from "src/components/forgot-password-modal";
import {
  googleSigninMutationOptions,
  signinMutationOptions,
} from "src/queries/auth.queries";
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
  const googleSigninMutation = useMutation(
    mutationOptions(googleSigninMutationOptions()),
  );
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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

  const handleGoogleSignin = () => {
    googleSigninMutation.mutate(undefined, {
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
        toast.error("Failed to login with Google", {
          position: "bottom-left",
        });
      },
    });
  };

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

                    <div className="col-span-6 sm:flex flex-col sm:gap-4">
                      <Button
                        className="w-full rojo-gradient font-bold h-12 rounded-lg"
                        loading={mutation.isPending}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="w-full rojo-gradient font-bold h-12 rounded-lg"
                        loading={googleSigninMutation.isPending}
                        type="button"
                        onClick={handleGoogleSignin}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 mr-2 inline-block"
                        >
                          <title>Google Logo</title>
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                        Continue with Google
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
                </Form>

                <div className="h-full grid items-center">
                  <img
                    src="/todoalrojo-logo.png"
                    alt="TodoAlRojo Logo"
                    className="w-32 sm:w-44 mx-auto md:mt-8"
                  />
                </div>
              </div>
            </main>

            <aside className="hidden sticky right-0 top-0 h-screen lg:block lg:col-span-7 xl:col-span-8 w-full"></aside>
          </div>
        </div>
      </section>
      <ForgotPasswordModal
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
      />
    </>
  );
}
