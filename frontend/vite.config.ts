import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "frontend/dist", // Ensure this matches the distDir in vercel.json
    chunkSizeWarningLimit: 1000, // Optional, for the chunk size warning
  },
});
