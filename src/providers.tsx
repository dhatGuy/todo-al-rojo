import { QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "./components/ui/sonner";

// Create a client
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 1000 * 60,
      },
    },
  });

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themeColor={{
        light: "oklch(1 0 0)",
        dark: "oklch(0.145 0 0)",
      }}
    >
      {children}

      <Toaster />
    </ThemeProvider>
  );
}
