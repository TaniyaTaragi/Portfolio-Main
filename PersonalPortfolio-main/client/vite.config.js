import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ["https://portfolio-main-1-p99u.onrender.com"],
    proxy: {
      "/api": {
        target: " https://portfolio-main-3-gi34.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    host: true,
    port: 5173,
  },
});
