import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      external: ["pg-native"],
    },
  },
  plugins: [
    tsConfigPaths(),

    tanstackStart({
      customViteReactPlugin: true,
      target: "cloudflare-module",
    }),
    tailwindcss(),
    viteReact(),
  ],
});
