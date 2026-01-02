import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/user": {
        target: "https://juicebackend-dr38.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/product": {
        target: "https://juicebackend-dr38.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/category": {
        target: "https://juicebackend-dr38.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
