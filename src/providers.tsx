import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack";
import { QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthQueryProvider>
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
    </AuthQueryProvider>
  );
}
