import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { FloatingLabelInput } from "@repo/ui/components/floating-label-input";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/form";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import bgSignup from "../assets/images/signup-bg.png";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(8).max(50),
});

type FormData = z.infer<typeof formSchema>;

function RouteComponent() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (_data: FormData) => {
    try {
      // await axios.post("/api/signup", data);
      // toast.success("Account created successfully!");
      // router.push("/login");
    } catch (error) {
      // toast.error("Failed to create account");
    }
  };

  return (
    <section className="bg-[#2a2e43] min-h-svh">
      <div className="grid min-h-svh lg:grid-cols-12">
        <main className="flex flex-col px-0 py-0 lg:col-span-5 xl:col-span-4 overflow-y-auto pb-10">
          <div className="flex flex-col justify-between gap-10 size-full lg:max-w-3xl">
            <div className="bg-red-700 rounded-bl-4xl px-8 py-10">
              <Button className="" size="icon" variant="ghost">
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
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-6 sm:flex flex-col sm:gap-4">
                  <Button className="w-full rojo-gradient font-bold h-12 rounded-lg">
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
